import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { FileMetaData } from 'src/app/model/file-meta-data';
import { FileService } from 'src/app/shared/file.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  selectedFiles !: FileList;
  currentFileUpload !: FileMetaData;
  percentage: number = 0;

  constructor(private fileService: FileService, private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }
  //method to select file
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  //method to upload file
  uploadFile() {
    this.currentFileUpload = new FileMetaData(this.selectedFiles[0]);
    const path = 'Uploads/' + this.currentFileUpload.file.name;

    const storageRef = this.fireStorage.ref(path);
    const uploadTask = storageRef.put(this.selectedFiles[0]);

    uploadTask.snapshotChanges().pipe(finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadLink => {
        this.currentFileUpload.url = downloadLink;
        this.currentFileUpload.size = this.currentFileUpload.file.size;
        this.currentFileUpload.name = this.currentFileUpload.file.name;

        this.fileService.savaMetaDataOfFile(this.currentFileUpload);
        })
    })).subscribe((res: any) => {
      this.percentage = (res.bytesTransferred * 1000 / res.res.totalBytes);
    }, error => {
      console.log(" Error ocurred ")
    });
  }
  // method to get all files
  getAllFiles() {

  }
  //method to delete file
  deteleFile() {

  }

}
