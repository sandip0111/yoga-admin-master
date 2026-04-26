import { Component, OnInit } from "@angular/core";
import { ServiceService } from "../services/service.service";

@Component({
  standalone: false,
  selector: "app-send-email",
  templateUrl: "./send-email.component.html",
  styleUrls: ["./send-email.component.scss"],
})
export class SendEmailComponent implements OnInit {
  constructor(private service: ServiceService) {}

  ngOnInit(): void {}
  name: string = "";
  email: string = "";

  onSubmit() {
    this.service
      .sendMailToPrashantJi({ name: this.name, email: this.email })
      .subscribe(
        (res) => {
          alert("Email sent successfully!");
        },
        (err) => {

          alert("Error sending email.");
        }
      );
  }
}
