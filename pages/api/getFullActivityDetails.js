// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getConfig, setConfig } from '@/utils/configEngine'
import prisma from '@/utils/database';
import { withPermissionCheck } from '@/utils/permissionsManager'
import * as noblox from 'noblox.js'

export default withPermissionCheck(handler, 'admin');

export async function handler(req,res) {

	const workspace = await prisma.workspace.findFirst({
		where: {
			groupId: 10503931,
		}
	});
	//if (!workspace) return res.status(404).json({ success: false, error: 'Workspace not found' });

	//const roles = await noblox.getRoles(workspace.groupId);
	const activityconfig = await getConfig('activity', 10503931);

	res.status(200).send({
		data: activityconfig,
		success: true,
	});
}
