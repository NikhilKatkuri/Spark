interface CreateCommandOptions {
    projectName?: string
    srcDir: string
    template?: string
    packageManager: 'npm' | 'pnpm' | 'yarn'
    git: boolean
    addons: string[]
    useDefaults: boolean
    compatibilityVersion: string
}
export { CreateCommandOptions }
