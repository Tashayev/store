 class ApiError extends Error{//32 п.
     constructor(status, message) {
         super();//Ключевое слово super используется для вызова функций, принадлежащих родителю объекта.
         this.status = status
         this.message = message
     }

    static badRequest(message) {// статические функции можно вызывать без метода и обращаться на прямую к классу
        return new ApiError(404, message)
    }

     static internal(message) {
         return new ApiError(500, message)
     }

    static forbidden(message) {
        return new ApiError(403, message)
    }
 }//32 п.

module.exports = ApiError