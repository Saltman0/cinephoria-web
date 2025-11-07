import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class MailApiService {
    constructor(private router: Router) {}

    public async sendForgotPasswordMail(email: string, title: string, description: string): Promise<any> {
        const response: Response = await fetch("https://formspree.io/f/xdkprvjg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email, title: title, description: description})
        });

        if (!response.ok) {
            if (response.status === 401) {
                this.router.navigate(['/login']);
            }
            throw new Error(response.status.toString());
        }

        return response.json();
    }

    public async sendContactMail(email: string, title: string, description: string): Promise<any> {
        const response: Response = await fetch("https://formspree.io/f/xjkojppa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email, title: title, description: description})
        });

        if (!response.ok) {
            if (response.status === 401) {
                this.router.navigate(['/login']);
            }
            throw new Error(response.status.toString());
        }

        return response.json();
    }
}