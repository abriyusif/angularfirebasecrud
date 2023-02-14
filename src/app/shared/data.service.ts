import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  //method to add students
  addStudent(student : Student) {
    student.id = this.afs.createId();
    return this.afs.collection('/Students').add(student);
  }

  //method for getting all students
  getAllStudents() {
    return this.afs.collection('/Students').snapshotChanges();
  }

  //method to delete students
  deleteStudent(student: Student) {
    return this.afs.doc('/Students/' + student.id).delete();
  }

  //method to update student
  updateStudent(student: Student) {
    this.deleteStudent(student);
    this.addStudent(student);
  }

  
}
