#!/usr/bin/env node
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import chalk from 'chalk';
/*Interfaces allow you to specify what methods a class should implement.
 Interfaces make it easy to use a variety of different
 classes in the same way. When one or more classes use the same interface,
  it is referred to as "polymorphism".*/
  const sleep =  () => {
    return new Promise((r) => setTimeout(r, 4000));
  }
  
  async function welcome() {
    const style = chalkAnimation.karaoke(
      'Welcome to this TODO list program \n'
    );
  
    await sleep(); //waiting for sleep to over
    style.stop();
  
    }
   await welcome();
  
interface Todo {
  title: string;
  completed: boolean;
}

class TodoList  {
  private todos: Todo[];

  constructor() {
    this.todos = [];
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  getTodos(): Todo[] {
    return this.todos;
  }
}

const todoList = new TodoList();

async function getTodosFromUser() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of todo:'
    }
  ]);

  todoList.addTodo({
    title: answers.title,
    completed: false
  });
}

async function Menu() {
  console.log('Welcome to your todo list');
  while (true) {
    console.log(chalk.green('What would you like to do?'));
    console.log('1. Add a todo');
    console.log('2. View all todos');
    console.log('3. Exit');

    const answers = await inquirer.prompt([
      {
        type: 'number',
        name: 'choice',
        message: 'Enter choice :'
      }
    ]);

    if (answers.choice === 1) {
      await getTodosFromUser();
    } else if (answers.choice === 2) {
      console.log(todoList.getTodos());
    } else if (answers.choice === 3) {
      console.log(chalk.bgYellow('Goodbye!'));
      process.exit(0);
    } else {
      console.log(chalk.red('Invalid choice'));
    }
  }
}

Menu();
