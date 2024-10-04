// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getConfig, setConfig } from '@/utils/configEngine'
import prisma from '@/utils/database';
import { withPermissionCheck } from '@/utils/permissionsManager'
import * as noblox from 'noblox.js'
type Data = {
	success: boolean
	error?: string
	roles?: any
	currentRole?: any
}

export default withPermissionCheck(handler, 'admin');

export async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {

	const workspace = await prisma.workspace.findFirst({
		where: {
			groupId: 10503931,
		}
	});
	if (!workspace) return res.status(404).json({ success: false, error: 'Workspace not found' });

	//const roles = await noblox.getRoles(workspace.groupId);
	const activityconfig = await getConfig('activity', parseInt(req.query.id as string));

	res.status(200).send({
		activityconfig,
		success: true,
	});
}
