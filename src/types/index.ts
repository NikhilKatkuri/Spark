interface CreateCommandOptions {
    projectName?: string
    srcDir: string
    template?: string
    packageManager: 'npm' | 'pnpm' | 'yarn'
    git: boolean
}
export { CreateCommandOptions }
