import {Publisher, Subjects, TicketCreatedEvent} from '@akrtickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject:Subjects.TicketCreated = Subjects.TicketCreated;
}