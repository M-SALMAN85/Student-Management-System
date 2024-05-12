#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    view_balance() {
        console.log(`balance for ${this.name} :$${this.balance}`);
    }
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} fees paid successfully for ${this.name}`);
        console.log(`${this.name} Remaining Balance : $${this.balance} `);
    }
    show_status() {
        console.log(`id: ${this.id}`);
        console.log(`name: ${this.name}`);
        console.log(`courses: ${this.courses}`);
        console.log(`balance: $${this.balance}`);
    }
}
class student_manage {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added Successfully Student ID: ${student.id}`);
    }
    enrol_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} Enroll in ${course} successfully`);
        }
    }
    view_balance_student(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student Not Found. Please Enter a correct Student ID");
        }
    }
    pay_student_fee(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student Not Found. Please Enter a correct Student ID");
        }
    }
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
async function main() {
    console.log("Welcome to 'ibne seena' student Management System");
    console.log("-".repeat(50));
    let student_manager = new student_manage();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select One Option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ]
            }
        ]);
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name1",
                        type: "input",
                        message: "Enter A Student Name",
                    }
                ]);
                student_manager.add_student(name_input.name1);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Your Id:",
                    },
                    {
                        name: "Course",
                        type: "input",
                        message: "Enter Course Name:",
                    }
                ]);
                student_manager.enrol_student(course_input.student_id, course_input.Course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    }
                ]);
                student_manager.view_balance_student(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter A Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter A Student Amount",
                    }
                ]);
                student_manager.pay_student_fee(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let show_status = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    }
                ]);
                student_manager.show_student_status(show_status.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
main();
