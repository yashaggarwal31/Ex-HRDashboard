/* eslint-disable react/jsx-key */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import DialogFields from '@/components/DialogFields'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FieldTypes } from "@/components/enums/survey-field-types";

export function SurveyInput({
  children,
  fieldType,
  formFields,
  setFormFields,
}: {
  children: string;
  fieldType: FieldTypes;
  formFields: any;
  setFormFields: any;
}) {
  const [labelValue, setLabelValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [inputValueSecond, setInputValueSecond] = useState<string>("");
  const [multipleInput, setMultipleInput] = useState<string[]>([]);

  const [matrixRowInput, setMatrixRowInput] = useState<string[]>([]);
  const [matrixColumnInput, setMatrixColumnInput] = useState<string[]>([]);

  function addField(type: FieldTypes) {
    // const label = formData.get('label') as string;

    if (type == FieldTypes.TEXTINPUT) {
      setFormFields([
        ...formFields,
        { type: FieldTypes.TEXTINPUT, label: labelValue },
      ]);
      // setLabelValue('');
    }

    if (type == FieldTypes.DROPDOWN) {
      setFormFields([
        ...formFields,
        {
          type: FieldTypes.DROPDOWN,
          label: labelValue,
          options: multipleInput,
        },
      ]);
      // setMultipleInput([]);
      // setLabelValue('');
    }

    if (type == FieldTypes.CHECKBOX) {
      setFormFields([
        ...formFields,
        {
          type: FieldTypes.CHECKBOX,
          label: labelValue,
          options: multipleInput,
        },
      ]);
      // setMultipleInput([]);
      // setLabelValue('');
    }

    if (type == FieldTypes.FILEUPLOAD) {
      setFormFields([
        ...formFields,
        { type: FieldTypes.FILEUPLOAD, label: labelValue },
      ]);
      // setLabelValue('');
    }

    if (type == FieldTypes.DATE) {
      setFormFields([
        ...formFields,
        { type: FieldTypes.DATE, label: labelValue },
      ]);
      // setLabelValue('');
    }

    if (type == FieldTypes.MATRIX) {
      setFormFields([
        ...formFields,
        {
          type: FieldTypes.MATRIX,
          label: labelValue,
          matrixRow: matrixRowInput,
          matrixColumn: matrixColumnInput,
        },
      ]);
      // setMultipleInput([]);
      // setLabelValue('');
    }

    //get field label
    // let fieldContent = 'Hello'
    // if(fieldType=='label'){
    //   setFormFields([...formFields, {"type":`${fieldType}`,"label":`${fieldContent}`}])
    // }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{children}</Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        {/* <form action={addField}> */}
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Field Title</h4>
            <p className="text-muted-foreground text-sm">{children}</p>
          </div>

          {fieldType === FieldTypes.TEXTINPUT && (
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="labelID"
                  name="label"
                  defaultValue="Your Label"
                  className="col-span-2 h-8"
                  onChange={(e) => {
                    setLabelValue(e.target.value);
                    //console.log(e.target.value);
                  }}
                />
              </div>
              <Button
                className=""
                onClick={() => addField(FieldTypes.TEXTINPUT)}
              >
                Submit Choices
              </Button>
            </div>
          )}

          {fieldType == FieldTypes.DROPDOWN && (
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="label">Question: </Label>
                <Input
                  id="labelID"
                  name="label"
                  defaultValue="Your Label"
                  className="col-span-2 h-8"
                  onChange={(e) => {
                    setLabelValue(e.target.value);
                    //console.log(e.target.value);
                  }}
                />

                <Label htmlFor="label">New Option</Label>
                <Input
                  id="labelID"
                  name="label"
                  defaultValue="Your Label"
                  className="col-span-2 h-8"
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    //console.log(e.target.value);
                  }}
                />
                <button
                  onClick={() =>
                    setMultipleInput([...multipleInput, inputValue])
                  }
                >
                  Add Option
                </button>

                <button
                  onClick={() =>
                    setMultipleInput([])
                  }
                >
                  Clear
                </button>

                <ul>
                  {multipleInput.map((item) => {
                    return <li>{item}</li>;
                  })}
                </ul>
              </div>
              <Button
                className=""
                onClick={() => addField(FieldTypes.DROPDOWN)}
              >
                Submit Choices
              </Button>
            </div>
          )}

          {fieldType == FieldTypes.CHECKBOX && (
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="label">Question: </Label>
                <Input
                  id="labelID"
                  name="label"
                  defaultValue="Your Label"
                  className="col-span-2 h-8"
                  onChange={(e) => {
                    setLabelValue(e.target.value);
                    //console.log(e.target.value);
                  }}
                />

                <Label htmlFor="label">New Option</Label>
                <Input
                  id="labelID"
                  name="label"
                  defaultValue="Your Label"
                  className="col-span-2 h-8"
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    //console.log(e.target.value);
                  }}
                />
                <button
                  onClick={() =>
                    setMultipleInput([...multipleInput, inputValue])
                  }
                >
                  Add Option
                </button>

                <button
                  onClick={() =>
                    setMultipleInput([])
                  }
                >
                  Clear
                </button>

                <ul>
                  {multipleInput.map((item) => {
                    return <li>{item}</li>;
                  })}
                </ul>
              </div>
              <Button
                className=""
                onClick={() => addField(FieldTypes.CHECKBOX)}
              >
                Submit Choices
              </Button>
            </div>
          )}

          {fieldType == FieldTypes.DATE && (
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="labelID"
                  name="label"
                  defaultValue="Your Label"
                  className="col-span-2 h-8"
                  onChange={(e) => {
                    setLabelValue(e.target.value);
                    // console.log(e.target.value);
                  }}
                />
              </div>
              <Button className="" onClick={() => addField(FieldTypes.DATE)}>
                Submit Choices
              </Button>
            </div>
          )}

          {fieldType == FieldTypes.MATRIX && (
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="label">Question: </Label>
                <Input
                  id="labelID"
                  name="label"
                  defaultValue="Your Label"
                  className="col-span-2 h-8"
                  onChange={(e) => {
                    setLabelValue(e.target.value);
                    // console.log(e.target.value);
                  }}
                />

                <Label htmlFor="label">New row</Label>
                <Input
                  id="labelID"
                  name="label"
                  defaultValue="Your Label"
                  className="col-span-2 h-8"
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    //console.log(e.target.value);
                  }}
                />

                <Label htmlFor="label">New Column</Label>
                <Input
                  id="labelID"
                  name="label"
                  defaultValue="Your Label"
                  className="col-span-2 h-8"
                  onChange={(e) => {
                    setInputValueSecond(e.target.value);
                    //console.log(e.target.value);
                  }}
                />

                <button
                  onClick={() =>
                    setMatrixRowInput([...matrixRowInput, inputValue])
                  }
                >
                  Add Row
                </button>

                <button
                  onClick={() =>
                    setMatrixColumnInput([
                      ...matrixColumnInput,
                      inputValueSecond,
                    ])
                  }
                >
                  Add Column
                </button>

                <button
                  onClick={() =>
                    {
                      setMatrixColumnInput([]);
                      setMatrixRowInput([]);
                    }
                  }
                >
                  Clear
                </button>

                <ul>
                  {matrixRowInput.map((item) => {
                    return <li>{item}</li>;
                  })}
                </ul>

                <ul>
                  {matrixColumnInput.map((item) => {
                    return <li>{item}</li>;
                  })}
                </ul>
              </div>
              <Button className="" onClick={() => addField(FieldTypes.MATRIX)}>
                Submit Choices
              </Button>
            </div>
          )}

          {fieldType == FieldTypes.FILEUPLOAD && (
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="labelID"
                  name="label"
                  defaultValue="Your Label"
                  className="col-span-2 h-8"
                  onChange={(e) => {
                    setLabelValue(e.target.value);
                    //console.log(e.target.value);
                  }}
                />
              </div>
              <Button
                className=""
                onClick={() => addField(FieldTypes.FILEUPLOAD)}
              >
                Submit Choices
              </Button>
            </div>
          )}
        </div>
        {/* </form> */}
      </PopoverContent>
    </Popover>
  );
}
