import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode.react';
import { generateRandomCode } from '../../../server/src/generateRandomCode';
import { io, Socket } from 'socket.io-client';

export function Component() {
    const { t } = useTranslation();
    const [classCode, setClassCode] = useState('');
    const [enteredCode, setEnteredCode] = useState('');
    const [socket, setSocket] = useState<Socket>({} as Socket);
    const qrCodeValueRef = useRef('');

    useEffect(() => {
        // Generate a random class code (you can replace this with your logic)

        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        // clean up connection upon unmount
        () => {
            newSocket.disconnect();
        };
    }, []);

    const createConnection = () => {
        const newClassCode = generateRandomCode();
        setClassCode(newClassCode);
        // Update the QR code value
        qrCodeValueRef.current = newClassCode;
        socket.emit('createConnection');
    };

    const joinConnection = () => {
        socket.emit('join');
    };

    return (
        <div className={style.container}>
            <div className={style.innerContainer}>
                <img
                    src="/logo192_bw.png"
                    alt="GenAI logo"
                    width={192}
                    height={192}
                />
                <TextField
                    label={t('Enter Code')}
                    fullWidth
                    className={style.textbox}
                    value={enteredCode}
                    onChange={(e) => setEnteredCode(e.target.value)}
                />
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    component="a"
                    onClick={joinConnection}
                >
                    {t('Go')}
                </Button>
                <div className={style.qrCodeContainer}>
                    <QRCode
                        value={qrCodeValueRef.current}
                        size={192}
                    />
                </div>
                <p>{classCode}</p>
                {/* <div className={style.spacer} /> */}
                <Button
                    variant="outlined"
                    href="/dashboard"
                    className={style.createButton}
                    onClick={createConnection}
                >
                    {t('Create New')}
                </Button>
            </div>
        </div>
    );
}
