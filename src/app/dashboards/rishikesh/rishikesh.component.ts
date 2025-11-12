import { Component, Input, OnInit } from "@angular/core";
import {
  searchPranaRambhFilter,
  twoHunTTCModel,
  twoHunTTCModelResultModel,
} from "src/app/models/dashboard";
import { DashboardSharedService } from "../dashboard-shared.service";
import { ServiceService } from "src/app/services/service.service";

@Component({
  selector: "app-rishikesh",
  templateUrl: "./rishikesh.component.html",
  styleUrls: ["./rishikesh.component.scss"],
})
export class RishikeshComponent implements OnInit {
  loading: boolean = false;

  @Input() paymentOption: { value: string; name: string }[];
  @Input() paymentTypeOption: string[];
  @Input() monthOption: string[];

  constructor(
    private service: ServiceService,
    private dashboardShared: DashboardSharedService
  ) {}

  ngOnInit(): void {}
}
