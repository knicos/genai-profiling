import * as xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

const inputFolder = process.argv[2];
const outputFile = process.argv[3];

async function processDir() {
    const rows = [];

    try {
        const files = await fs.promises.readdir(inputFolder);

        for (const file of files) {
            const p = path.join(inputFolder, file);
            const stat = await fs.promises.stat(p);

            if (stat.isDirectory()) {
                const files2 = await fs.promises.readdir(p);

                for (const file2 of files2) {
                    if (file2 === 'responses.json') {
                        const data = await fs.promises.readFile(path.join(p, file2), 'utf8');
                        const pdata = JSON.parse(data);

                        pdata.forEach((d) => {
                            const row = {};
                            row.id = d.id;
                            row.name = d.name;
                            row.school = file;
                            d.responses.forEach((r) => {
                                row[r.question.text] = r.value;
                            });

                            rows.push(row);
                        });
                    }
                }
            }
        }

        const worksheet = xlsx.utils.json_to_sheet(rows);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Responses');
        xlsx.writeFile(workbook, outputFile, { compression: true });
    } catch (e) {
        console.error(e);
    }
}

processDir();
