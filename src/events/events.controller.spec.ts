import { Test, TestingModule } from '@nestjs/testing'
import { EventsController } from './events.controller'
import { WinstonModule } from 'nest-winston'

describe('Events Controller', () => {
  let controller: EventsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot({})],
      controllers: [EventsController]
    }).compile()

    controller = module.get<EventsController>(EventsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
