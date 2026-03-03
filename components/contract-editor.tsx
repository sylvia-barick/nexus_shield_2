"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Bot, Link2 } from "lucide-react"
import { contractService, type Contract } from "@/lib/contract-service"

interface ContractEditorProps {
  initialContract?: Contract
  onSave: (contract: Contract) => void
  onCancel: () => void
}

export function ContractEditor({ initialContract, onSave, onCancel }: ContractEditorProps) {
  const [title, setTitle] = useState(initialContract?.title || "")
  const [content, setContent] = useState(initialContract?.content || "")
  const [type, setType] = useState(initialContract?.type || "")
  const [jurisdiction, setJurisdiction] = useState(initialContract?.jurisdiction || "")
  const [parties, setParties] = useState(initialContract?.parties.join(", ") || "")
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)

    const partiesArray = parties
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean)

    let contract: Contract
    if (initialContract) {
      const updated = contractService.updateContract(initialContract.id, {
        title,
        content,
        type,
        jurisdiction,
        parties: partiesArray,
      })
      contract = updated!
    } else {
      contract = contractService.createContract(title, content, type, jurisdiction, partiesArray)
    }

    setTimeout(() => {
      setSaving(false)
      onSave(contract)
    }, 500)
  }

  const isValid = title.trim() && content.trim() && type && jurisdiction

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Contract Details</CardTitle>
          <CardDescription>Basic information about the contract</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Contract Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Service Agreement with Acme Corp"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Contract Type *</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                  <SelectItem value="service">Service Agreement</SelectItem>
                  <SelectItem value="partnership">Partnership Agreement</SelectItem>
                  <SelectItem value="employment">Employment Contract</SelectItem>
                  <SelectItem value="sales">Sales Contract</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jurisdiction">Jurisdiction *</Label>
              <Select value={jurisdiction} onValueChange={setJurisdiction}>
                <SelectTrigger id="jurisdiction">
                  <SelectValue placeholder="Select jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="eu">European Union</SelectItem>
                  <SelectItem value="singapore">Singapore</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="parties">Parties (comma-separated)</Label>
              <Input
                id="parties"
                placeholder="e.g., Company A, Company B"
                value={parties}
                onChange={(e) => setParties(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Contract Content</CardTitle>
          <CardDescription>Draft your contract text below</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter contract content here..."
            className="min-h-[400px] font-mono text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card className="border-border bg-muted/30">
        <CardHeader>
          <CardTitle className="text-sm">AI-Powered Features</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" disabled>
            <Bot className="h-4 w-4 mr-2" />
            Analyze Risks
          </Button>
          <Button variant="outline" size="sm" disabled>
            <Bot className="h-4 w-4 mr-2" />
            Check Compliance
          </Button>
          <Button variant="outline" size="sm" disabled>
            <Link2 className="h-4 w-4 mr-2" />
            Anchor to Blockchain
          </Button>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!isValid || saving} className="bg-primary hover:bg-primary/90">
          {saving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Contract
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
