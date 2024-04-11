import { Injectable } from '@angular/core';

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
}

const MENUITEMS = [
    // { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
    // { state: 'users', type: 'link', name: 'Users', icon: 'account_circle' },
    { state: 'add-case', type: 'link', name: 'Add Case', icon: 'add_box' },
    { state: 'reactivate-line', type: 'link', name: 'ReActivate Line', icon: 'data_usage' },
    { state: 'hipposak', type: 'link', name: 'HippoSak', icon: 'album' },
    { state: 'masterstrip', type: 'link', name: 'Master Strip', icon: 'reorder' },
    { state: 'trashbag', type: 'link', name: 'Trash Bag', icon: 'album' },
    { state: 'masterroll', type: 'link', name: 'Master Roll', icon: 'album' },
    { state: 'pullnpak', type: 'link', name: 'PullNPak', icon: 'legend_toggle' },
    { state: 'repro', type: 'link', name: 'Repro', icon: 'auto_mode' },
    { state: 'scrap', type: 'link', name: 'Scrap', icon: 'settings' },
    { state: 'palletization', type: 'link', name: 'Palletization', icon: 'auto_awesome_mosaic' },
    { state: 'stripcut', type: 'link', name: 'Strip Cut', icon: 'grid_on' },
    // { state: 'button', type: 'link', name: 'Tickets', icon: 'crop_7_5' },
    // { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
    // { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
    // { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
    // { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
    // { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
    // {
    //   state: 'expansion',
    //   type: 'link',
    //   name: 'Expansion Panel',
    //   icon: 'vertical_align_center'
    // },
    // { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
    // { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
    // {
    //   state: 'progress-snipper',
    //   type: 'link',
    //   name: 'Progress snipper',
    //   icon: 'border_horizontal'
    // },
    // {
    //   state: 'progress',
    //   type: 'link',
    //   name: 'Progress Bar',
    //   icon: 'blur_circular'
    // },
    // {
    //   state: 'dialog',
    //   type: 'link',
    //   name: 'Dialog',
    //   icon: 'assignment_turned_in'
    // },
    // { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
    // { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
    // { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
    // {
    //   state: 'slide-toggle',
    //   type: 'link',
    //   name: 'Slide Toggle',
    //   icon: 'all_inclusive'
    // }
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
