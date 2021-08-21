App = {
    contracts: {},

    load: async ()=> {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.renderTasks()
    },

    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
          } else {
            window.alert("Please connect to Metamask.")
          }
          // Modern dapp browsers...
          if (window.ethereum) {
              console.log("we are here");
            window.web3 = new Web3(ethereum)
            try {
              // Request account access if needed
              // await ethereum.enable()
              await eth_requestAccounts()
              // Acccounts now exposed
              await web3.eth.sendTransaction({})
              
              
              
            } catch (error) {
              // User denied account access...
            }

          }
          // Legacy dapp browsers...
          else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
             await web3.eth.sendTransaction({})
          }
          // Non-dapp browsers...
          else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
          }
    },

    loadAccount: async () => {
        // Set the current blockchain account
        const myacc = await web3.eth.getAccounts();
       //App.account = web3.eth.accounts[1]
       // console.log(App.account);
       //console.log(myacc);
        
       App.account = myacc;

        const acc = document.getElementById("myhash");
        acc.innerHTML=myacc;
      },


    loadContract: async () => {
        const todoList = await $.getJSON('ToDoList.json');
        App.contracts.TodoList = TruffleContract(todoList)
        App.contracts.TodoList.setProvider(App.web3Provider)

        App.todoList = await App.contracts.TodoList.deployed()
    },

    renderTasks: async () => {
        
        const taskCount = await App.todoList.taskCount();
        //const $tasklist = $('.taskList');
        var ul = document.getElementById('myul');

        for(var i=1;i<=taskCount;i++){

            const task = await App.todoList.tasks(i);

            const taskId = task[0].toNumber();
            const taskContent = task[1]
            const isCompleted = task[2]

            //console.log(taskContent);

            
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(taskContent));
            ul.appendChild(li);


            

        
        }
    },

    addTask: async () => {
        const content = $('#mytext').val();
        console.log(content);
        console.log(App.account);
        const temp = App.account;
        console.log(temp[0])
        await App.todoList.createTask(content,{from: temp[0] });
        console.log("success");
        window.location.reload(); 
    }
}


$(() => {
    $(window).load(() => {
      App.load()
    })
  })