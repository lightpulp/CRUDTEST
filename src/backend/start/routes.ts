import ApisController from 'App/Controllers/Http/ApisController';
import { Router } from 'express';
const Route = Router();

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route.get('/greet',ApisController.greet)
Route.get('/configurations',ApisController.configurations)
Route.post('/configuration/insert', ApisController.insert_configuration)
Route.post('/configuration/update', ApisController.update_configuration)
Route.post('/configuration/delete', ApisController.delete_configuration)

Route.get('/configuration/:id', ApisController.get_configuration_by_id);

export { Route as routes };
