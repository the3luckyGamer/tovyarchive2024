import axios from "axios";

export async function getLogo(group) {
  const { data } = await axios.get(
    `https://thumbnails.roblox.com/v1/groups/icons?groupIds=${group}&size=150x150&format=Png`
  );

  return data.data[0].imageUrl;
}

export function getGroup(groupId) {
  return new Promise((resolve, reject) => {
    axios.get(`https://groups.roblox.com/v1/groups/${groupId}`).then(data => {
      let body = data.data

      if (body.shout) {
          body.shout.created = new Date(body.shout.created)
          body.shout.updated = new Date(body.shout.updated)
      }

      resolve(body)
    }).catch(err => {
      reject(err)
    })
  })
}
