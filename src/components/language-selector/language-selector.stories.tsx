import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";
import { LanguageSelector } from "@components/language-selector";

const Template: Story<ComponentProps<typeof LanguageSelector>> = (args) => <LanguageSelector {...args} />;

export const Default = Template.bind({});

export default {
	title: "Language Selector component",
	component: LanguageSelector,
};
