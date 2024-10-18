import { Configuration } from 'Database/entities/configuration';
import { Response, Request } from 'express';

export default class ApisController {
    static async greet(request: Request, response: Response) {
        response.json({ greeting: `Hello, ${request.query.name}` });
    }

    static async configurations(request: Request, response: Response){
        const configuration = await Configuration.find();

        response.json({
            status: 1,
            data: configuration
        });
    }

    static async get_configuration_by_id(request: Request, response: Response) {
        const { id } = request.params;
        const configuration = await Configuration.findOneBy({ id: Number(id) });
    
        if (!configuration) {
            response.json({
                status: 0,
                message: "Configuration not found!",
            });
            return;
        }
    
        response.json({
            status: 1,
            data: configuration,
        });
    }

    static async insert_configuration(request: Request, response: Response) {
        const { key, value } = request.body;
        
        // Insert the configuration and get the result
        const result = await Configuration.save({ key, value });
    
        if (!result) {
            response.json({
                status: 0,
                message: "Configuration insertion failed!",
            });
            return;
        }
    
        response.json({
            status: 1,
            message: "Configuration has been inserted!",
            insertedId: result.id, // Return the inserted id
        });
    }
   

    static async update_configuration(request: Request, response: Response){
        const { key, value } = request.body;
        const getConfiguration = await Configuration.findBy({ key });

        if(!getConfiguration){
            response.json({
                status: 0,
                message: "Configuration not found!"
            });
        }
        
        await Configuration.update({ key }, { value });
        response.json({
            status: 1,
            message: "Configuration has been updated!",
        });
    }

    static async delete_configuration(request: Request, response: Response){
        const { key } = request.body;
        const getConfiguration = await Configuration.findBy({ key });

        if(!getConfiguration){
            response.json({
                status: 0,
                message: "Configuration not found!"
            });
        }

        await Configuration.delete({ key });

        response.json({
            status: 1,
            message: "Configuration has been deleted!",
        });
    }
}