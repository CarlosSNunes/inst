import * as moment from 'moment';
import { DateDifference } from 'src/app/models/date-difference.model';

/**
 * 
 * @param date1 Date that the difference will be calculated, the most recent date.
 * @param date2 Date that will be differencied.
 * @returns {DateDifference} DateDifference object
 */
export default function getDifferences(date1: Date, date2: Date): DateDifference {

    const diffObj: Partial<DateDifference> = new DateDifference({
        hours: moment(date1).diff(date2, 'hours'),
        days: moment(date1).diff(date2, 'days'),
        months: moment(date1).diff(date2, 'months'),
        years: moment(date1).diff(date2, 'years')
    })

    let diffResponseMessage: string = '';

    if (diffObj.hours < 48) {
        diffResponseMessage = `${diffObj.hours} horas atrás`;
    }

    if (diffObj.days > 1) {
        diffResponseMessage = `${diffObj.days} dias atrás`;
    }

    if (diffObj.months >= 1 && diffObj.months < 12) {
        if (diffObj.months == 1) {
            diffResponseMessage = `${diffObj.months} mês atrás`;
        }
        if (diffObj.months > 1) {
            diffResponseMessage = `${diffObj.months} meses atrás`;
        }
    }

    if (diffObj.years >= 1) {
        if (diffObj.years == 1) {
            diffResponseMessage = `${diffObj.years} ano atrás`;
        }
        if (diffObj.years > 1) {
            diffResponseMessage = `${diffObj.years} anos atrás`;
        }
    }

    return new DateDifference({
        ...diffObj,
        diffResponseMessage
    })
}