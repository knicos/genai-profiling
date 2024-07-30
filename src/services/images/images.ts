const imageStore = new Map<string, string>();

export function addImage(name: string, data: string) {
    imageStore.set(name, data);
}

export function getImage(name: string): string | undefined {
    return imageStore.get(name) || (URL.canParse(name) ? name : undefined);
}
