"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { CONTRACT_TEMPLATES, type ContractTemplate } from "@/lib/contract-service"

interface ContractTemplateSelectorProps {
  onSelectTemplate: (template: ContractTemplate) => void
  onStartBlank: () => void
}

export function ContractTemplateSelector({ onSelectTemplate, onStartBlank }: ContractTemplateSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Choose a Template</h2>
        <p className="text-muted-foreground">Start with a template or create from scratch</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          className="border-2 border-dashed border-border hover:border-primary hover:bg-accent/50 cursor-pointer transition-all"
          onClick={onStartBlank}
        >
          <CardHeader>
            <FileText className="h-10 w-10 text-primary mb-2" />
            <CardTitle className="text-lg">Blank Contract</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Start from scratch with a blank document</CardDescription>
          </CardContent>
        </Card>

        {CONTRACT_TEMPLATES.map((template) => (
          <Card
            key={template.id}
            className="border-border hover:border-primary hover:shadow-md cursor-pointer transition-all"
            onClick={() => onSelectTemplate(template)}
          >
            <CardHeader>
              <FileText className="h-10 w-10 text-accent mb-2" />
              <CardTitle className="text-lg">{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-3">{template.description}</CardDescription>
              <div className="text-xs text-muted-foreground">Category: {template.category}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
