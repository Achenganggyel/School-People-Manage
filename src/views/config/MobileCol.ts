export const TeacherCol = {
    cols: [{
        width: '150',  // 宽度
        type: 'select',  // 类型
        prop: 'manageposttype',  // prop接收数据
        label: '分期', // label名
        dict: 'manageposttype'  //  匹配是哪一个字典
      },
      {
        width: '200',
        type: 'input',
        prop: 'issuingauthority',
        label: '机构',
      },
      {
        width: '150',
        type: 'select',
        prop: 'manageposttype',
        label: '岗位类别',
        dict: 'manageposttype'
      },
      {
        width: '200',
        type: 'select',
        prop: 'careertreecode',
        label: '岗位名称',
        dict: 'careertreecode'
      },
      {
        width: '150',
        type: 'datePicker',
        prop: 'manageposttype',
        label: '报名时间',
      },
      {
        width: '150',
        type: 'select',
        prop: 'validStatus',
        label: '审核状态',
        dict: 'validStatus'
      },
      {
        width: '',
        type: 'input',
        prop: 'appliConditions',
        label: '详细信息',
      },
    ]
  }