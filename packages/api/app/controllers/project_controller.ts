import Project from "#models/project";
import { createProjectSchema, editProjectSchema } from "#validators/project_validators";
import { HttpContext } from "@adonisjs/core/http";
import { create } from "domain";

export default class ProjectController {
  async index({ auth, response }: HttpContext){
    if(auth.use('web').isLoggedOut){
      return response.unauthorized();
    }
    const projects = await Project.findManyBy({ userId: auth.user!.id })
    return response.json(projects.map((project) => ({
      uuid: project.uuid,
      name: project.name,
    })));
  }
  async store({ auth, request, response }: HttpContext){
    if(auth.use('web').isLoggedOut){
      return response.unauthorized();
    }
    createProjectSchema.tryValidate(request.all())
    const payload =  await request.validateUsing(createProjectSchema);
    const project = await Project.create(payload);

    return response.created(project.serialize());
  }
  async show({ auth, params,response }: HttpContext){
    if(auth.use('web').isLoggedOut){
      return response.unauthorized();
    }
    const project = await Project.findByOrFail({ uuid: params.uuid, userId: auth.user!.id });
    return response.json(project.serialize())
  }
  async update({ auth, params, request, response }: HttpContext){
    if(auth.use('web').isLoggedOut){
      return response.unauthorized();
    }
    const project = await Project.findByOrFail({ uuid: params.uuid, userId: auth.user!.id });
    const payload =  await request.validateUsing(editProjectSchema);
    await project.merge(payload).save();


    return response.json(project.serialize());
  }
  async destroy({ auth, params, response }: HttpContext){
    if(auth.use('web').isLoggedOut){
      return response.unauthorized();
    }
    const project = await Project.findByOrFail({  uuid: params.uuid, userId: auth.user!.id });
    await project.delete();
    return response.noContent()
  }

}
