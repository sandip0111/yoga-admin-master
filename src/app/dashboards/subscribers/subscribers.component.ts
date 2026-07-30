import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ServiceService } from "../../services/service.service";
import { DashboardSharedService } from "../dashboard-shared.service";

@Component({
  standalone: false,
  selector: "app-subscribers",
  templateUrl: "./subscribers.component.html",
  styleUrls: ["./subscribers.component.scss"],
})
export class SubscribersComponent implements OnInit {
  subscribers: any[] = [];
  total: number = 0;
  loading: boolean = false;
  p: number = 1;
  filter: any = {
    pageNo: 1,
    size: 10,
    searchText: "",
  };

  @Output() downloadCsv = new EventEmitter<{
    csvContent: string;
    tableId: string;
  }>();

  constructor(
    private service: ServiceService,
    public dashboardShared: DashboardSharedService
  ) {}

  ngOnInit(): void {
    this.getAllSubscribers();
  }

  getAllSubscribers() {
    this.loading = true;
    this.service.getAllSubscribers(this.filter).subscribe(
      (res: any) => {
        this.subscribers = res.data;
        this.total = res.total;
        this.dashboardShared.subscribersTitle = `Subscribers (${this.total})`;
        this.loading = false;
      },
      (err) => {
        console.error(err);
        this.loading = false;
      },
    );
  }

  onTableDataChange(event: number) {
    this.p = event;
    this.filter.pageNo = event;
    this.getAllSubscribers();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  onSearch() {
    this.filter.pageNo = 1;
    this.p = 1;
    this.getAllSubscribers();
  }

  clearFilter(): void {
    this.filter.searchText = "";
    this.onSearch();
  }

  exportToExcel(tableId: string): void {
    const table = document.getElementById(tableId) as HTMLTableElement;
    if (!table) return;
    let csvContent = "";
    const rows = Array.from(table.querySelectorAll("tr"));
    rows.forEach((row) => {
      const cols = Array.from(row.querySelectorAll("th, td"));
      const rowData = cols.map((col) => `"${(col as HTMLElement).innerText.trim().replace(/"/g, '""')}"`);
      csvContent += rowData.join(",") + "\n";
    });
    this.downloadCsv.emit({ csvContent, tableId });
  }

  deleteRow(student: any): void {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.removeSubscribeData(student._id).subscribe({
        next: () => {
          alert("Record deleted successfully");
          this.getAllSubscribers();
        },
      });
    }
  }
}
