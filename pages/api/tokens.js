import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { uuid } from 'uuidv4';

const handler = nc();

handler.get(async (req, res) => {
  const id = uuid();
  const secret = uuid();
  const hashedSecret = await bcrypt.hash(secret, 10);
  console.log({ id, secret, hashedSecret });
  res.send('Success');
});

export default handler;
