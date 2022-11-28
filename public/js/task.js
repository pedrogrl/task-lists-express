async function setTagAsDone(element, id) {
    event.preventDefault();

    try {
        let response = await fetch(`/tasks/${id}?_method=put`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ task: { done: element.checked } }),
        });
        let data = await response.json();
        let task = data.task;
        let parent = element.parentNode;

        element.checked = task.done; // v/f

        parent.classList.toggle("has-text-success");
        parent.classList.toggle("is-italic");
    } catch (error) {
        alert("Error while updating the task status");
    }
}
