import { multiselect, select } from '@clack/prompts'
import { Template, templates } from '../configs/template'
import { CreateCommandOptions } from 'src/types'

const addOns = async (options: CreateCommandOptions) => {
    const filteredAddOns = templates.find((t) => t.name === options.template) as Template
    const availableAddOns = filteredAddOns.additionalTools
    const versionsList = filteredAddOns.vlist.map((v) => ({
        value: v,
        label: v,
    }))
    if (!options.useDefaults) {
        const selectedAddOns = await multiselect({
            message: 'Select add-ons to include in your project:',
            options: availableAddOns.map((tool) => ({
                value: tool,
                label: tool,
            })),
        })
        options.addons = selectedAddOns as string[]

        const versions =
            versionsList.length > 1
                ? await select({
                      message: 'Select compatibility version:',
                      options: versionsList,
                      initialValue: versionsList[0].value,
                  })
                : versionsList[0].value
        options.compatibilityVersion = versions as string
        return
    }
    options.addons = availableAddOns
}

export default addOns
