
import tuRequest from '@/service'

enum TreeData {
    // 获取动态树形顶层数据
    getDynamicTop = '/core/communities/search/top',
    getSubcommunities = '/core/communities/'
}

export function getDynamicTopData() {
    return tuRequest.get({
        url: TreeData.getDynamicTop,
    })
}
export function getSubDynamicData(id: string, page: number = 0, size: number = 20) {
    let url = TreeData.getSubcommunities + id + "/subcommunities?page=" + page + "&size=" + size + "&embed.size=subcommunities=1&embed=subcommunities&embed.size=collections=1&embed=collection"
    return tuRequest.get({
        url: url,
    })
}