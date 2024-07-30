import { UserInfo } from './userinfo';
import style from './style.module.css';
import QRCode from '@knicos/genai-base/components/QRCode';
import { useTranslation, Trans } from 'react-i18next';

interface Props {
    users: UserInfo[];
    code: string;
    material: string;
    lang: string;
}

export default function StartDialog({ users, code, material, lang }: Props) {
    const { t } = useTranslation();

    return (
        <div className={style.groupedItems}>
            <div className={style.connectMessage}>
                <QRCode
                    url={`${window.location.origin}/individual/${code}/${material}/${lang}`}
                    size="large"
                />
                <div className={style.column}>
                    <div>
                        <Trans
                            values={{ codeText: code }}
                            i18nKey="connection"
                            components={{
                                Code: <em />,
                            }}
                        />
                    </div>
                    <a
                        href={`${window.location.origin}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {window.location.host}
                    </a>
                </div>
            </div>
            <div className={style.userListing}>
                {users.length === 0 && <div>{t('waitingPeople')}</div>}
                {users.length === 1 && <div>{t('onePerson', { count: users.length })}</div>}
                {users.length > 1 && <div>{t('manyPeople', { count: users.length })}</div>}
            </div>
        </div>
    );
}
