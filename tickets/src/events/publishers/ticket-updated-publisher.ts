import {Publisher, Subjects, TicketUpdatedEvent} from '@akrtickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject:Subjects.TicketUpdated = Subjects.TicketUpdated;
}