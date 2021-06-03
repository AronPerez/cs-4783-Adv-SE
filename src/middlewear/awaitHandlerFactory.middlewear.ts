const awaitHandlerFactory = ({middleware}: { middleware: any }) => {
    async function newVar(req: any, res: any, next: any) {
        try {
            await middleware(req, res, next)
        } catch (err) {
            next(err)
        }
    }
    return newVar
}

module.exports = awaitHandlerFactory;