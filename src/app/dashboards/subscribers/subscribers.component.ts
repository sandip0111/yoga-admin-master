import { Component, OnInit } from "@angular/core";
import { ServiceService } from "../../services/service.service";

@Component({
  selector: "app-subscribers",
  templateUrl: "./subscribers.component.html",
  styleUrls: ["./subscribers.component.scss"],
})
export class SubscribersComponent implements OnInit {
  subscribers: any[] = [];
  total: number = 0;
  loading: boolean = false;
  p: number = 1;

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.getAllSubscribers();
  }

  getAllSubscribers() {
    this.loading = true;
    this.service.getAllSubscribers().subscribe(
      (res: any) => {
        this.subscribers = res.data;
        this.total = res.total;
        this.loading = false;
      },
      (err) => {
        console.error(err);
        this.loading = false;
      },
    );
  }
}
