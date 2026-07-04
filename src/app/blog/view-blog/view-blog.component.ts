import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';


@Component({
  standalone: false,
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {
 isLoading = false;
  blogList: any;
  imageUrl: any;
  filter: any = {};
  p: number = 1;
  total: any;

  // Delete modal state
  showDeleteModal = false;
  isDeleting = false;
  blogToDeleteId: any = null;
  blogToDeleteTitle: string = '';

  // Status modal state
  showStatusModal = false;
  isUpdatingStatus = false;
  statusTargetItem: any = null;
  statusTargetNew: boolean = false;
  constructor(private service:ServiceService) {}

  ngOnInit(): void {
    this.imageUrl = this.service.imageUrl;
    this.getAllBlog();
    this.filter={
      pageNo:1,
      size:10
    };
  }

  getAllBlog(){
    this.isLoading = true;
    this.service.getAllBlog(this.filter).subscribe((res:any)=>{
      this.blogList =  res.data;
      this.total = res.total;
      this.isLoading =false
      // console.warn(this.userlist);
    })
  }

  // ---- Delete Modal ----
  openDeleteModal(id: any, title: string) {
    this.blogToDeleteId = id;
    this.blogToDeleteTitle = title;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.isDeleting = false;
    this.blogToDeleteId = null;
    this.blogToDeleteTitle = '';
  }

  confirmDelete() {
    if (!this.blogToDeleteId) return;
    this.isDeleting = true;
    this.service.deleteBlog({ _id: this.blogToDeleteId }).subscribe((res: any) => {
      this.isDeleting = false;
      if (res.status === 'ok') {
        this.closeDeleteModal();
        this.getAllBlog();
      } else {
        alert('Something went wrong. Please try again.');
        this.closeDeleteModal();
      }
    });
  }

  // ---- Status Modal ----
  openStatusModal(item: any) {
    this.statusTargetItem = item;
    this.statusTargetNew = !item.isActive;
    this.showStatusModal = true;
  }

  closeStatusModal() {
    this.showStatusModal = false;
    this.isUpdatingStatus = false;
    this.statusTargetItem = null;
  }

  confirmToggleStatus() {
    if (!this.statusTargetItem) return;
    this.isUpdatingStatus = true;
    this.service.updateBlogStatus({ _id: this.statusTargetItem._id, isActive: this.statusTargetNew }).subscribe((res: any) => {
      this.isUpdatingStatus = false;
      if (res.status === 'ok') {
        this.statusTargetItem.isActive = this.statusTargetNew;
        this.closeStatusModal();
      } else {
        alert('Failed to update status. Please try again.');
        this.closeStatusModal();
      }
    });
  }

  onTableDataChange(event: any) {
    this.filter.pageNo = event;
    this.getAllBlog();
    this.p = event;
    window.scrollTo({
     top: 0,
     behavior: 'smooth'
   });
 }
}
