import { v4 as uuidv4 } from 'uuid';
import { addDays, formatISO } from 'date-fns';

const generateInvitationToken = (): string => {
  const token = uuidv4();

  const currentDate = new Date();

  const expirationDate = addDays(currentDate, 7);

  const formattedExpirationDate = formatISO(expirationDate);

  const tokenWithExpiration = `${token}_${formattedExpirationDate}`;

  return tokenWithExpiration;
};


export default generateInvitationToken;
