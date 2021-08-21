// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0;

contract ToDoList{
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool isCompleted;
    }

    constructor() public {
        createTask("Solidity Programming");
    }

    mapping(uint => Task) public tasks;

    event TaskCreated(
        uint id,
        string content,
        bool isCompleted
    );

     event TaskCompleted(
    uint id,
    bool isCompleted
  );

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount,_content,false);
        emit TaskCreated(taskCount,_content,false);
    }

    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        _task.isCompleted = !_task.isCompleted;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.isCompleted);
  }
}