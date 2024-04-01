function solve(data) {
    const commandMap = {
        "Add New": addTask,
        "Change Status": changeTaskStatus,
        "Remove Task": removeTask,
    }
    const numberOfTasks = data.shift();
    let assignees = {};

    for (let i = 0; i < numberOfTasks; i++) {
        // "{assignee}:{taskId}:{title}:{status}:{estimatedPoints}"
        let [assigneeName, taskId, title, status, estimatedPoints] = data.shift().split(":");
        if (!assignees[assigneeName]) {
            assignees[assigneeName] = []
        }

        let newTask = {
            taskId,
            title,
            status,
            estimatedPoints: Number(estimatedPoints),
        };
        
        assignees[assigneeName].push(newTask)
        
    }

    for (const line of data) {
        let [command, ...tokens] = line.split(":")
        commandMap[command](...tokens)
    }

    let toDoTasksTotalPoints = calculatePoints("ToDo")
    let inProgressTasksTotalPoints = calculatePoints("In Progress")
    let codeReviewTasksTotalPoints = calculatePoints("Code Review")
    let doneTasksTotalPoints = calculatePoints("Done")

    console.log(
        `ToDo: ${toDoTasksTotalPoints}pts\n` +
            `In Progress: ${inProgressTasksTotalPoints}pts\n` +
            `Code Review: ${codeReviewTasksTotalPoints}pts\n` +
            `Done Points: ${doneTasksTotalPoints}pts`
    );

    if (doneTasksTotalPoints >= toDoTasksTotalPoints+ inProgressTasksTotalPoints + codeReviewTasksTotalPoints ){
        console.log("Sprint was successful!")
    }else{
        console.log("Sprint was unsuccessful...")
    }

    function calculatePoints (filter) {
        return Object.values(assignees)
        .flat()
        .filter((t) => t.status === filter)
        .reduce((acc, t) => acc + t.estimatedPoints, 0);
    }

    function isAssigneeExists (assigneeName){
        if (!assignees[assigneeName]) {
            console.log(`Assignee ${assigneeName} does not exist on the board!`)
            return false
        }
        return true
    }

    function addTask(assigneeName, taskId, title, status, estimatedPoints){

        if(!isAssigneeExists(assigneeName)) return;

        let newTask = {
            taskId,
            title,
            status,
            estimatedPoints: Number(estimatedPoints),
        }
        assignees[assigneeName].push(newTask)
    }

    function changeTaskStatus(assigneeName, taskId, newStatus) {
        
        if(!isAssigneeExists(assigneeName)) return;

        let currentTask = assignees[assigneeName].filter (t => t.taskId === taskId)[0]

        if (!currentTask) {
            console.log(`Task with ID ${taskId} does not exist for ${assigneeName}!`)
            return
        }

        currentTask.status = newStatus

    }

    function removeTask (assigneeName, index) {
        if(!isAssigneeExists(assigneeName)) return;

        if (index < 0 || index >= assignees[assigneeName].length) {
            console.log ("Index is out of range!")
            return
        }

       assignees[assigneeName].splice(index, 1)
        if(assignees[assigneeName] == []) {
            delete assignees[assigneeName]
        }
    }

}

// solve([
//     "5",
//     "Kiril:BOP-1209:Fix Minor Bug:ToDo:3",
//     "Mariya:BOP-1210:Fix Major Bug:In Progress:3",
//     "Peter:BOP-1211:POC:Code Review:5",
//     "Georgi:BOP-1212:Investigation Task:Done:2",
//     "Mariya:BOP-1213:New Account Page:In Progress:13",
//     "Add New:Kiril:BOP-1217:Add Info Page:In Progress:5",
//     "Change Status:Peter:BOP-1290:ToDo",
//     "Remove Task:Mariya:1",
//     "Remove Task:Joro:1",
// ]);

solve([
    "4",
    "Kiril:BOP-1213:Fix Typo:Done:1",
    "Peter:BOP-1214:New Products Page:In Progress:2",
    "Mariya:BOP-1215:Setup Routing:ToDo:8",
    "Georgi:BOP-1216:Add Business Card:Code Review:3",
    "Add New:Sam:BOP-1237:Testing Home Page:Done:3",
    "Change Status:Georgi:BOP-1216:Done",
    "Change Status:Will:BOP-1212:In Progress",
    "Remove Task:Georgi:3",
    "Change Status:Mariya:BOP-1215:Done",
]);