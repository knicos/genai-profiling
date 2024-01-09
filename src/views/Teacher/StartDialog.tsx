import { UserInfo } from './userinfo';
import style from './style.module.css';
import QRCode from '@genaipg/components/QRCode/QRCode';
import { useTranslation, Trans } from 'react-i18next';
import { SmallButton } from '@genaipg/components/Button/Button';

interface Props {
    users: UserInfo[];
    code: string;
    onStart: () => void;
}

export default function StartDialog({ users, code, onStart }: Props) {
    const { t } = useTranslation();

    return (
        <div className={style.groupedItems}>
            <div className={style.connectMessage}>
                <QRCode
                    url={`${window.location.origin}/individual/${code}`}
                    size="large"
                />
                <div className={style.column}>
                    <div>
                        <Trans
                            values={{ codeText: code }}
                            i18nKey="dashboard.messages.connection"
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
                {users.length === 0 && <div>{t('dashboard.messages.waitingPeople')}</div>}
                {users.length === 1 && <div>{t('dashboard.messages.onePerson', { count: users.length })}</div>}
                {users.length > 1 && <div>{t('dashboard.messages.manyPeople', { count: users.length })}</div>}
                <SmallButton
                    variant="contained"
                    color="secondary"
                    data-testid="dashboard-start-button"
                    onClick={onStart}
                >
                    {t('dashboard.actions.start')}
                </SmallButton>
            </div>
        </div>
    );
}
