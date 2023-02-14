import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  studentsList: Student[] = [];

  studentObj: Student = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
  };

  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  mobile: string = '';


  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  //create register method
  // register() {
  //   this.auth.signout();
  // }

  //method to get all students
  getAllStudents() {
    this.data.getAllStudents().subscribe(res => {
      this.studentsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, error => {
      alert('Error while fetching the students data');
    })
  }

  //function to reset form
  resetForm() {
    this.id = '';
  this.first_name = '';
  this.last_name = '';
  this.email = '';
  this.mobile = '';
  }

  //method to add student
  addStudent() {
    if (this.first_name == '' || this.last_name == '' || this.email == '' || this.mobile == '') {
      alert(' Please fill all the fields ')
    }

    this.studentObj.id = '';
    this.studentObj.first_name = this.first_name;
    this.studentObj.last_name = this.last_name;
    this.studentObj.email = this.email;
    this.studentObj.mobile = this.mobile;

    this.data.addStudent(this.studentObj);
    this.resetForm();
  }

  //method to update student
  updateStudent() {

  }

  //method to delete student
  deleteStudent(student: Student) {
    if (window.confirm(' Are you sure you want to delete student ' + student.first_name + ' ' + student.last_name + '?')) {
      this.data.deleteStudent(student);
    }
  }
}
