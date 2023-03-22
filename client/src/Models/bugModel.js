function bugModel(bug){
    if(bug != undefined){
    this._id = bug._id;
    this.name = bug.name;
    this.description = bug.description;
    this.project = bug.project;
    this.priority = bug.priority;
    this.creator = bug.creator;
    this.assigned = bug.assigned;
    this.status = bug.status;
    this.datePosted = bug.datePosted
    }
}

export default bugModel