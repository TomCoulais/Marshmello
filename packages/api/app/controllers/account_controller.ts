import { HttpContext } from "@adonisjs/core/http";

export default class AccountController {
  async deleteAccount({ auth, response}: HttpContext){
    if (auth.use('web').isLoggedOut){
      return response.unauthorized();
    }

    const authUser = auth.user!;
    await auth.use('web').logout();

    await authUser.delete();

    return response.noContent();
  }
}
