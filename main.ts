#! /usr/bin/env node

import inquirer from "inquirer"
import  chalk from "chalk"

// Define a student class

class student {
    static counter = 10000
    id : number;
    name :string;
    courses : string[];
    balance : number;

    constructor(name:string){
        this.id = student.counter++;
        this.name = name
        this.courses = [] // initialize an empty array for courses
        this.balance = 100;
    }
    // Method to enroll a student in a course
    enroll_course(course : string){
        this.courses.push(course)
    }
    // Method to view a student balance

    view_balance(){
        console.log(chalk.bold.cyanBright(`Balance for ${this.id} : is $${this.balance}`));

    }
    // Method to pay fees
    pay_fees(amount : number){
        this.balance -= amount
        console.log(chalk.bold.cyanBright(`$${amount} Fees paid successfully for ${this.name}`))
    }
    // Method to display student status
    show_status(){
        console.log(chalk.bold.yellowBright(`Id : ${this.id}`))
        console.log(chalk.bold.yellowBright(`Name : ${this.name}`))
        console.log(chalk.bold.yellowBright(`Courses : ${this.courses}`))
        console.log(chalk.bold.yellowBright(`Balance : ${this.balance}`))
    }
}
// Defining a student manager class to manage student
class student_manager{
    students : student[]

    constructor(){
        this.students = []
    }
    // Method to add a new student
    add_student(name : string){
      let Student = new student(name)
      this.students.push(Student)
      console.log(chalk.bold.cyanBright(`Student : ${name} added successfully. Student ID: ${Student.id}`))
    }
    // Method to enroll a student in a course
    enroll_student(student_id : number, course : string){
        let student = this.find_student(student_id);
         if(student){
            student.enroll_course(course);
            console.log(chalk.bold.cyanBright(`${student.name} enrolled in ${course} successfully`))
         }
         else{
            console.log(chalk.bold.redBright("Student not found. Please enter a correct student id"))
        }
    }
    // Method to view a student balance
    view_student_balance(student_id:number){
        let student = this.find_student(student_id);
        if (student){
             student.view_balance()
        }
        else{
            console.log(chalk.bold.redBright("Student not found. Please enter a correct student id"))
        }
    }
      
     // Method to pay student fees
     pay_student_fees(student_id:number, amount:number){
        let student = this.find_student(student_id);
        if(student){
           student.pay_fees(amount)
        }
        else{
            console.log(chalk.bold.redBright("Student not found. Please enter a correct student id"))
        }
     }
      
      //Method to display student status
      show_student_status(student_id:number){
        let student = this.find_student(student_id);
        if(student){
            student.show_status()
        }
      }
       
    // Method to find a student by student_id
    find_student(student_id:number){
        return this.students.find(std => std.id === student_id)
    }
}    

//Main function to run program

async function main(){
      console.log(chalk.italic.blue("\n\t Welcome to 'Hashir Raees' - Student management system \n\t"))
      console.log("-".repeat(60))

      let Student_manager = new student_manager()

  //While loop to let the program run

      while(true){
        let choice = await inquirer.prompt([
            {
                name:"choice",
                type:"list",
                message:"What would you like to do?",
                choices:["Add a new student","Enroll a student in a course","View a student balance","Pay student fees","View student status","Exit"]
            }
        ]);

        //Using switch case to handle user choice

        switch(choice.choice){
            case "Add a new student":
            let name_input = await inquirer.prompt([
                {
                    name:"name",
                    type:"input",
                    message:"Enter a student name"
                }
            ]);
            Student_manager.add_student(name_input.name);
            break;

            case "Enroll a student in a course":
                let course_input = await inquirer.prompt([
                    {
                        name : "student_id",
                        type : "number",
                        message : "Enter a student id",
                    },
                    {
                        name : "course",
                        type : "input",
                        message : "Enter a course name",
                    }
                ]);
                Student_manager.enroll_student(course_input.student_id,course_input.course);
                break;
                
             case "View a student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name : "student_id",
                        type : "number",
                        message : "Enter a student id",
                    }
                ]);
                Student_manager.view_student_balance(balance_input.student_id);
                break;

              case "Pay student fees":
                let fees_input = await inquirer.prompt([
                    {
                        name : "student_id",
                        type : "number",
                        message : "Enter a student id",
                    },
                    {
                        name : "amount",
                        type : "input",
                        message : "Enter amount to be paid",
                    }
                ]);
                Student_manager.pay_student_fees(fees_input.student_id,fees_input.amount);
                break;

              case "View student status":
              let status_input = await inquirer.prompt([
                {
                    name : "student_id",
                    type : "number",
                    message : "Enter a student id",
                }
              ]);
              Student_manager.show_student_status(status_input.student_id);
              break;

            case "Exit":
                console.log(chalk.italic.blue("\n\t Thank you for using 'Hashir Raees' - Student management system \n\t"))
                process.exit();

        }
      }
}

// Calling a main fucntion
main();