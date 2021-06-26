import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
    sub:string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    //RECEBER O TOKEN

    const authToken = request.headers.authorization;
    //VALIDAR SE O TOKEN ESTA PREENCHIDO
    if (!authToken) {
        return response.status(401).end()
    }
//RECUPERAR INFORMACOES DO USUARIO
    const [, token] = authToken.split(" ");
    try {
        //VALIDAR SE O TOKEN TRAS O QUE É ESPERADO 
        const { sub } = verify(token, "bd9fbf3a97a33b02d4fb49db20dd6fb8") as IPayload
        request.user_id = sub;

        return next()
    } catch (err) {
        return response.status(401).end()
    }

    //RECUPERAR INFORMACOES DO USUARIO


}
