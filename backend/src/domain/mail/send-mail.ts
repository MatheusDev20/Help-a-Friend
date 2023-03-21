export interface MailService {
    send(text: string): Promise<void>
}
