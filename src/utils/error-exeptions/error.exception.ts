export class ErrorException {
    constructor(error: number){
        this.checkError(error)
    }

    private checkError(error: number){
        switch (error) {
            case 0:
                return;
            case -1:
                throw new Error("SIGN CHECK FAILED")
            case -2:
                throw new Error("Incorrect parameter amount")
            case -3:
                throw new Error("Action not found")
            case -4:
                throw new Error("Already paid")
            case -5:
                throw new Error("User does not exist")
            case -6:
                throw new Error("Transaction does not exist")
            case -7:
                throw new Error("Failed to update user")
            case -8:
                throw new Error("Error in request from click")
            case -9:
                throw new Error("Transaction cancelled")
            
        }
    }
}