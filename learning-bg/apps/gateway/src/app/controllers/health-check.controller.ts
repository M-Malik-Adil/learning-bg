import { Controller, Get, Inject, Logger, Render } from "@nestjs/common";
import { ClientRMQ } from "@nestjs/microservices";
import { ApiExcludeController } from "@nestjs/swagger";

import { API_ENDPOINTS, MicroserviceEnum, SERVICES, RMQ_MESSAGES} from "@shared/constants";    
import { firstValueFrom, timeout } from "rxjs";

@ApiExcludeController()
@Controller()
export class HealthCheckController {
    protected readonly logger  = new Logger();

    constructor(
        @Inject(MicroserviceEnum.MICRO_SERVICES)
        private readonly svcClients: ClientRMQ[]
    ){}

    @Get(API_ENDPOINTS.HEALTH.HEALTH_CHECK)
    async check(){
        function formatServiceName(name: string) {
            return name
              .toLowerCase()
              .replace(/_/g, ' ')
              .replace(/(?: |\b)(\w)/g, function (key) {
                return key.toUpperCase();
              });
          }

          try {
            const services = {};
            const checkTimeout = 1500; // Milliseconds
      
            // Perform health checks for each service in parallel
            await Promise.all(
              Object.keys(SERVICES).map(async (svc, i) => {
                try {
                  // Send health check request and wait for response with timeout
                  console.log("======= try ===",svc)
                  services[svc] = await firstValueFrom(
                    this.svcClients[i]
                      .send(RMQ_MESSAGES.HEALTH.HEALTH_CHECK, {})
                      .pipe(timeout(checkTimeout))
                  );
                } catch (err) {
                  // Handle health check failure
                  console.log("======= Error ===",svc)
                  services[svc] = { healthCheckPassed: false, healthCheck: 'Failed' };
                  this.logger.error(
                    `[Health Alert] ${formatServiceName(
                      svc
                    )} Microservice Failure\nReason: ${err?.message}`
                  );
                }
              })
            );
      
            const SERVICE_ORDER = [
              'USER',
            ];
            // Construct array of health check results
            return SERVICE_ORDER.map((svc) => ({
              name: `${formatServiceName(svc)} Microservice`,
              ...services[svc],
            }));
          } catch (err) {
            this.logger.error(err);
          }
    }

    @Get(API_ENDPOINTS.HEALTH.HEALTH_CHECK_VIEW)
    @Render(API_ENDPOINTS.HEALTH.HEALTH_CHECK_RENDER)
    async healthCheckView() {
      return { data: await this.check() };
    }
    @Get(API_ENDPOINTS.HEALTH.API_GUIDE)
    @Render(API_ENDPOINTS.HEALTH.API_GUIDE_RENDER)
    async apiGuideView() {
      return {};
    }

}