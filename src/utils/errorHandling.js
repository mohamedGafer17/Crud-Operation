export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => {
            return res.json({
                message: "Catch error",
                // error,
                // message: error.message,
                // stack: error.stack
            })
        })
    }
}