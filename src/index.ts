#!/usr/bin/env node

import { Command } from 'commander'
import pkg from '../package.json'
import { CreateCommandOptions } from './types'
import { outro, text } from '@clack/prompts'

/**
 * Entry point for the CLI application.
 * Sets up the command-line interface using the 'commander' library.
 * Includes metadata from package.json for name, description, and version.
 * Parses command-line arguments and options.
 * @module src/index
 *
 * @requires commander
 * @requires ../package.json
 *
 * CLI Design:
 * Spark -v | --version --> Outputs the current version of Spark
 * Spark --help --> Outputs help information about Spark commands and options
 * Spark [command] --> Executes the specified command with options
 * Spark --> Displays a welcome message and prompts for further action
 */

const handleSigInt = () => process.exit(0)

process.on('SIGINT', handleSigInt)
process.on('SIGTERM', handleSigInt)

const program = new Command()

program
    .name(pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1))
    .description(pkg.description)
    .version(pkg.version, '-v, --version', 'output the current version')

program
    .command('create')
    .description('create a new Spark project')
    .argument('[project-name]', 'name of the project to create')
    .option('--src-dir <directory>', 'source directory for the project', process.cwd())
    .option('--template <template-name>', 'specify a project template')
    .option('--git', 'initialize a git repository') 
    .action(async (projectName, opts) => {
        let options: CreateCommandOptions = {
            projectName: projectName ?? undefined,
            srcDir: opts.srcDir,
            template: opts.template || undefined,
            packageManager: opts.usePnpm ? 'pnpm' : opts.useYarn ? 'yarn' : 'npm',
            git: opts.git || false, 
        }

        if (!options.projectName) {
            const projectNameInput = await text({
                message: 'Please enter a project name:',
                defaultValue: 'my-spark-project',
            })
            options.projectName = projectNameInput as string
        }

        if (!options.template) {
            const templateInput = await text({
                message: 'Please enter a template name:',
                defaultValue: 'basic',
            })
            options.template = templateInput as string
        }

        outro(`Creating project with options: ${JSON.stringify(options, null, 2)}`)
    })

program.parse(process.argv)
