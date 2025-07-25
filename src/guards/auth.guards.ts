import { CanActivate, ExecutionContext } from "@nestjs/common";
import e from "express";
 
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser) {
      return false; // User is not authenticated
    }
    return request.currentUser.admin;
  }
}
 