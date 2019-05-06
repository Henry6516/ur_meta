<template>
  <section>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in this.allMenu"
        :label="item.name"
        :name="item.name"
        :key="index"
      ></el-tab-pane>
    </el-tabs>
    <div v-show="userShow">
      <!--需求工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="condition">
          <el-form-item>
            <el-input size="small" v-model="condition.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" plain @click="searchRequirements">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small" plain @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--需求列表-->
      <el-table
        :data="requirements"
        @sort-change="sortNumber"
        highlight-current-row
        :loading="listLoading"
        :height="tableHeight"
        style="width: 100%;"
      >
        <el-table-column prop="id" label="id" v-if="false"></el-table-column>
        <!-- <el-table-column type="selection"
                         align="center"
                         header-align="center"
        width="55"></el-table-column>-->
        <el-table-column type="index" align="center" header-align="center" width="45"></el-table-column>
        <el-table-column
          prop="createdDate"
          align="center"
          header-align="center"
          label="创建时间"
          :formatter="formatter"
          width="140"
          sortable
        ></el-table-column>
        <el-table-column
          prop="priority"
          align="center"
          header-align="center"
          label="重要程度"
          width="142"
          sortable
        >
          <el-table-column prop="priority" :render-header="renderHeader" align="center" width="142">
            <template slot-scope="scope">
              <el-tooltip
                placement="top"
                :content="scope.row.priority==1?'仅建议':scope.row.priority==2?'不重要不紧急':scope.row.priority==3?'重要不紧急':scope.row.priority==4?'紧急不重要':'重要且紧急'"
              >
                <el-rate v-model="scope.row.priority" disabled></el-rate>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="创建人" prop="creator" sortable header-align="center">
          <el-table-column prop="creator" :render-header="renderHeader" align="center"></el-table-column>
        </el-table-column>
        <el-table-column
          label="名称(可按紧急程度排序)"
          prop="priority"
          sortable="impotant"
          header-align="center"
        >
          <el-table-column prop="name" :render-header="renderHeader" align="center">
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.name }}</span>
              <el-tag :type="tags[scope.row.priority]['type']">{{ tags[scope.row.priority]['name']}}</el-tag>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="类别" prop="type" sortable header-align="center" min-width="100">
          <el-table-column prop="type" :render-header="renderHeader" align="center">
            <template slot-scope="scope">
              <span>{{types[scope.row.type]}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="详情" prop="detail" sortable header-align="center" min-width="180">
          <el-table-column
            prop="detail"
            :formatter="detailFormatter"
            :render-header="renderHeader"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="进度" prop="schedule" sortable header-align="center" min-width="100">
          <el-table-column prop="schedule" :render-header="renderHeader" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>说明: {{ schedule[scope.row.schedule]['hints']}}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ schedule[scope.row.schedule]['name']}}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="deadline"
          align="center"
          header-align="center"
          label="预计完成时间"
          sortable
        ></el-table-column>
        <el-table-column
          prop="createdDays"
          align="center"
          header-align="center"
          label="已创建时间(天)"
          sortable
        ></el-table-column>
        <el-table-column label="操作" header-align="center" width="220">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--需求新增界面-->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" ref="addForm">
          <el-form-item label="名称" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-radio-group v-model="addForm.type">
              <el-radio class="radio" :label="0">BUG</el-radio>
              <el-radio class="radio" :label="1">新需求</el-radio>
              <el-radio class="radio" :label="2">任务</el-radio>
              <el-radio class="radio" :label="3">改进建议</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="优先级">
            <el-rate
              show-text
              :texts="text"
              v-model="addForm.priority"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :max="5"
              style="margin-top:8px;"
            />
          </el-form-item>
          <el-form-item label="详情">
            <quill-editor
              v-model="content"
              ref="QuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            ></quill-editor>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
      <!--需求编辑界面-->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" label-position="left" ref="editForm">
          <el-form-item label="id" prop="id" v-if="false">
            <el-input v-model="editForm.id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-radio-group v-model="editForm.type">
              <el-radio label="0" :value="this.editForm.type">BUG</el-radio>
              <el-radio label="1" :value="this.editForm.type">新需求</el-radio>
              <el-radio label="2" :value="this.editForm.type">任务</el-radio>
              <el-radio label="3" :value="this.editForm.type">改进建议</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="优先级">
            <el-rate
              show-text
              :texts="text"
              v-model="editForm.priority"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :max="5"
              style="margin-top:8px;"
            />
          </el-form-item>
          <el-form-item label="详情">
            <quill-editor
              v-model="mycontent"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            ></quill-editor>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>
      <!--需求详情界面-->
      <el-dialog title="详情" :visible.sync="detailFormVisible" :close-on-click-modal="false">
        <el-form :model="detailForm" label-width="80px" label-position="left" ref="detailForm">
          <el-form-item label="名称" prop="name">
            <span>{{detailForm.name}}</span>
          </el-form-item>
          <el-form-item label="类别" prop="type">
            <span>{{types[detailForm.type]}}</span>
          </el-form-item>
          <el-form-item label="状态" prop="schedule">
            <el-steps :space="100" :active="this.detailForm.schedule" finish-status="success">
              <el-step title="待审核" v-if="this.detailForm.schedule!=1"></el-step>
              <el-step title="已驳回" v-if="this.detailForm.schedule==1"></el-step>
              <el-step title="处理中" v-if="this.detailForm.schedule!=1"></el-step>
              <!-- <el-step title="处理中"></el-step> -->
              <el-step title="处理完成" v-if="this.detailForm.schedule!=1"></el-step>
            </el-steps>
          </el-form-item>
          <el-form-item label="优先级" prop="priority">
            <el-rate
              show-text
              disabled
              :texts="text"
              v-model="this.detailForm.priority"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :max="5"
              style="margin-top:8px;"
            />
          </el-form-item>
          <el-form-item label="创建人" prop="creator">
            <span>{{detailForm.creator}}</span>
          </el-form-item>
          <el-form-item label="详情" prop="detail">
            <!-- 从数据库读取展示 -->
            <div v-html="str" class="ql-editor">{{str}}</div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="detailFormVisible = false">关闭</el-button>
        </div>
      </el-dialog>
      <!--需求分页工具条-->
      <el-col :span="24" class="toolbar">
        <div class="pagination-container">
          <el-pagination
            v-show="this.total>0"
            :current-page="condition.page"
            :page-sizes="[10,20,30,50,this.total]"
            :page-size="condition.pageSize"
            :total="this.total"
            background
            layout="total, sizes, slot, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          >
            <el-button type="text" @click="showAll">显示全部</el-button>
          </el-pagination>
        </div>
      </el-col>
    </div>
    <div v-show="auditShow">
      <!--审核工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="examine">
          <el-form-item>
            <el-input size="small" v-model="examine.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" plain @click="searchRequirements">查询</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button size="small" plain @click="auditSuccessAll">批量通过</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small" plain @click="auditFailedAll">批量驳回</el-button>
          </el-form-item>-->
        </el-form>
      </el-col>
      <!--审核列表-->
      <el-table
        :data="requirementsAudit"
        @sort-change="sortNumber"
        highlight-current-row
        :loading="auditLoading"
        @selection-change="selsChange"
        :height="tableHeight"
        style="width: 100%;"
      >
        <el-table-column prop="id" label="id" v-if="false"></el-table-column>
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column type="index" width="45" align="center"></el-table-column>
        <el-table-column
          prop="createdDate"
          label="创建时间"
          :formatter="formatter"
          width="140"
          sortable
        ></el-table-column>
        <el-table-column
          prop="priority"
          align="center"
          header-align="center"
          label="重要程度"
          width="142"
          sortable
        >
          <el-table-column
            prop="priority"
            :render-header="renderHeader2"
            align="center"
            width="142"
          >
            <template slot-scope="scope">
              <el-tooltip
                placement="top"
                :content="scope.row.priority==1?'仅建议':scope.row.priority==2?'不重要不紧急':scope.row.priority==3?'重要不紧急':scope.row.priority==4?'紧急不重要':'重要且紧急'"
              >
                <el-rate v-model="scope.row.priority" disabled></el-rate>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="创建人" prop="creator" sortable header-align="center">
          <el-table-column prop="creator" :render-header="renderHeader2" align="center"></el-table-column>
        </el-table-column>
        <!-- <el-table-column label="创建人" prop="creator" header-align="center" sortable>
          <el-table-column prop="creator" :render-header="renderHeader2" align="center"></el-table-column>
        </el-table-column>-->
        <el-table-column label="名称" prop="name" header-align="center" sortable>
          <el-table-column prop="name" :render-header="renderHeader2" align="center">
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.name }}</span>
              <el-tag :type="tags[scope.row.priority]['type']">{{ tags[scope.row.priority]['name']}}</el-tag>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="类别" prop="type" header-align="center" min-width="100" sortable>
          <el-table-column prop="type" :render-header="renderHeader2" align="center">
            <template slot-scope="scope">
              <span>{{types[scope.row.type]}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="详情" prop="detail" header-align="center" min-width="180" sortable>
          <el-table-column
            prop="detail"
            :formatter="detailFormatter"
            :render-header="renderHeader2"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          label="处理人"
          prop="processingPerson"
          header-align="center"
          min-width="80"
          sortable
        >
          <el-table-column prop="processingPerson" :render-header="renderHeader2" align="center"></el-table-column>
        </el-table-column>
        <el-table-column
          prop="deadline"
          align="center"
          header-align="center"
          label="预计完成时间"
          sortable
        ></el-table-column>
        <el-table-column
          prop="createdDays"
          align="center"
          header-align="center"
          label="已创建时间(天)"
          sortable
        ></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handlAddlDeal(scope.$index, scope.row)"
            >详情</el-button>
            <el-button
              size="small"
              @click="handleEditAudit(scope.$index, scope.row)"
              type="success"
            >审核</el-button>
            <!-- <el-button
              type="success"
              size="small"
              @click="handleSuccess(scope.$index, scope.row)"
            >通过</el-button>
            <el-button type="danger" size="small" @click="handleReject(scope.$index, scope.row)">驳回</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <!--审核编辑界面-->
      <el-dialog title="编辑" :visible.sync="editFormVisibleAudit" :close-on-click-modal="false">
        <el-form
          :model="editAuditForm"
          label-width="80px"
          label-position="left"
          ref="editFormAudit"
        >
          <el-form-item label="id" prop="id" v-if="false">
            <el-input v-model="editAuditForm.id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="editAuditForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-radio-group v-model="editAuditForm.type">
              <el-radio label="0" :value="this.editAuditForm.type">BUG</el-radio>
              <el-radio label="1" :value="this.editAuditForm.type">新需求</el-radio>
              <el-radio label="2" :value="this.editAuditForm.type">任务</el-radio>
              <el-radio label="3" :value="this.editAuditForm.type">改进建议</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="优先级">
            <el-rate
              show-text
              :texts="text"
              v-model="editAuditForm.priority"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :max="5"
              style="margin-top:8px;"
            />
          </el-form-item>
          <el-form-item label="处理人">
            <el-checkbox-group v-model="editAuditForm.processingPerson">
              <el-checkbox label="周朋许" name="processingPerson"></el-checkbox>
              <el-checkbox label="叶先钱" name="processingPerson"></el-checkbox>
              <el-checkbox label="史伟" name="processingPerson"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="预估时间" prop="deadline">
            <el-date-picker
              v-model="editAuditForm.deadline"
              type="datetime"
              placeholder="选择日期"
              @change="time"
            ></el-date-picker>
            <!-- <el-input v-model="editAuditForm.deadline" auto-complete="off"></el-input> -->
          </el-form-item>
          <el-form-item label="详情">
            <quill-editor
              v-model="mycontent"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            ></quill-editor>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisibleAudit = false">取消</el-button>
          <el-button
            type="primary"
            @click.native="editSubmit('Audit')"
            :loading="editAuditLoading"
          >保存</el-button>
          <el-button type="danger" @click="handleReject()">驳回</el-button>
          <el-button type="success" @click="handleSuccess()">通过</el-button>
        </div>
      </el-dialog>
      <!--审核详情界面-->
      <el-dialog title="详情" :visible.sync="addFormVisibleDeal" :close-on-click-modal="false">
        <el-form
          :model="detailAddForm"
          label-width="80px"
          label-position="left"
          ref="detailDealForm"
        >
          <el-form-item label="名称" prop="name">
            <span>{{detailAddForm.name}}</span>
            <!-- <el-tag :type="tags[detailForm.priority]['type']">{{tags[detailForm.priority]['name']}}</el-tag> -->
          </el-form-item>
          <el-form-item label="类别" prop="type">
            <span>{{types[detailAddForm.type]}}</span>
          </el-form-item>
          <el-form-item label="状态" prop="schedule">
            <el-steps :space="100" :active="this.detailAddForm.schedule" finish-status="success">
              <el-step title="待审核" v-if="this.detailAddForm.schedule!=1"></el-step>
              <el-step title="已驳回" v-if="this.detailAddForm.schedule==1"></el-step>
              <!-- <el-step title="待审核"></el-step>
              <el-step :title="this.detailAddForm.schedule<=1?'已驳回':'已通过'"></el-step>-->
              <!-- <el-step title="已驳回" v-if="this.detailForm.schedule<=1"></el-step> -->
              <el-step title="处理中" v-if="this.detailAddForm.schedule!=1"></el-step>
              <el-step title="处理完成" v-if="this.detailAddForm.schedule!=1"></el-step>
              <!-- <el-step :title='this.detailAddForm.schedule<=2?"已驳回":"处理中"'></el-step> -->
              <!-- <el-step title="处理中"></el-step> -->
              <!-- <el-step title="处理中"></el-step> -->
              <!-- <el-step title="处理完成"></el-step> -->
            </el-steps>
          </el-form-item>
          <el-form-item label="优先级" prop="priority">
            <el-rate
              show-text
              disabled
              :texts="text"
              v-model="this.detailAddForm.priority"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :max="5"
              style="margin-top:8px;"
            />
          </el-form-item>
          <el-form-item label="创建人" prop="creator">
            <span>{{detailAddForm.creator}}</span>
          </el-form-item>
          <el-form-item label="详情" prop="detail">
            <!-- 从数据库读取展示 -->
            <div v-html="str" class="ql-editor">{{str}}</div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisibleDeal = false">关闭</el-button>
        </div>
      </el-dialog>
      <!--审核分页工具条-->
      <el-col :span="24" class="toolbar">
        <div class="pagination-container">
          <el-pagination
            v-show="this.auditTotal>0"
            :current-page="examine.page"
            :page-sizes="[10,20,30,50,this.auditTotal]"
            :page-size="examine.pageSize"
            :total="this.auditTotal"
            background
            layout="total, sizes, slot, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          >
            <el-button type="text" @click="showAll('Audit')">显示全部</el-button>
          </el-pagination>
        </div>
      </el-col>
    </div>
    <div v-show="dealShow">
      <!--处理工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="deal">
          <el-form-item>
            <el-input size="small" v-model="deal.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" plain @click="searchRequirements">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--处理列表-->
      <el-table
        :data="requirementsDeal"
        @sort-change="sortNumber"
        highlight-current-row
        :loading="dealLoading"
        :height="tableHeight"
        style="width: 100%;"
      >
        <el-table-column prop="id" label="id" v-if="false"></el-table-column>
        <!-- <el-table-column type="selection" header-align="center" align="center" width="55"></el-table-column> -->
        <el-table-column type="index" header-align="center" align="center" width="45"></el-table-column>
        <el-table-column
          prop="createdDate"
          header-align="center"
          align="center"
          label="创建时间"
          :formatter="formatter"
          width="140"
          sortable
        ></el-table-column>
        <el-table-column
          prop="priority"
          align="center"
          header-align="center"
          label="重要程度"
          width="142"
          sortable
        >
          <el-table-column
            prop="priority"
            :render-header="renderHeader1"
            align="center"
            width="142"
          >
            <template slot-scope="scope">
              <el-tooltip
                placement="top"
                :content="scope.row.priority==1?'仅建议':scope.row.priority==2?'不重要不紧急':scope.row.priority==3?'重要不紧急':scope.row.priority==4?'紧急不重要':'重要且紧急'"
              >
                <el-rate v-model="scope.row.priority" disabled></el-rate>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="创建人" prop="creator" header-align="center" sortable>
          <el-table-column prop="creator" :render-header="renderHeader1" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="名称" prop="priority" header-align="center" sortable="important">
          <el-table-column prop="name" :render-header="renderHeader1" align="center">
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.name }}</span>
              <el-tag :type="tags[scope.row.priority]['type']">{{ tags[scope.row.priority]['name']}}</el-tag>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="类别" prop="type" header-align="center" min-width="100" sortable>
          <el-table-column prop="type" :render-header="renderHeader1" align="center">
            <template slot-scope="scope">
              <span>{{types[scope.row.type]}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="详情" prop="detail" header-align="center" min-width="180" sortable>
          <el-table-column
            prop="detail"
            :formatter="detailFormatter"
            :render-header="renderHeader1"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          header-align="center"
          label="处理人"
          prop="processingPerson"
          min-width="80"
          sortable
        >
          <el-table-column prop="processingPerson" :render-header="renderHeader1" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="状态" prop="status" header-align="center" min-width="100" sortable>
          <el-table-column prop="status" :render-header="renderHeader1" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>说明: {{ status[scope.row.status]['hints']}}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ status[scope.row.status]['name']}}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="deadline"
          align="center"
          header-align="center"
          label="预计完成时间"
          sortable
        ></el-table-column>
        <el-table-column
          prop="createdDays"
          align="center"
          header-align="center"
          label="已创建时间(天)"
          sortable
        ></el-table-column>
        <el-table-column label="操作" header-align="center" width="220">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleDetailDeal(scope.$index, scope.row)"
            >详情</el-button>
            <el-button size="small" @click="handleEditDeal(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelDeal(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--处理编辑界面-->
      <el-dialog title="编辑" :visible.sync="editFormVisibleDeal" :close-on-click-modal="false">
        <el-form :model="editDealForm" label-width="80px" label-position="left" ref="editDealForm">
          <el-form-item label="id" prop="id" v-if="false">
            <el-input v-model="editDealForm.id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="editDealForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-radio-group v-model="editDealForm.type">
              <el-radio label="0" :value="this.editDealForm.type">BUG</el-radio>
              <el-radio label="1" :value="this.editDealForm.type">新需求</el-radio>
              <el-radio label="2" :value="this.editDealForm.type">任务</el-radio>
              <el-radio label="3" :value="this.editDealForm.type">改进建议</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="editDealForm.status">
              <el-radio label="1" :value="this.editDealForm.status">Open</el-radio>
              <el-radio label="2" :value="this.editDealForm.status">In Progress</el-radio>
              <el-radio label="3" :value="this.editDealForm.status">Resovled</el-radio>
              <el-radio label="4" :value="this.editDealForm.status">Reopened</el-radio>
              <el-radio label="5" :value="this.editDealForm.status">Closed</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="优先级">
            <el-rate
              show-text
              :texts="text"
              v-model="editDealForm.priority"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :max="5"
              style="margin-top:8px;"
            />
          </el-form-item>
          <el-form-item label="处理人">
            <el-checkbox-group v-model="editDealForm.processingPerson">
              <el-checkbox label="周朋许" name="processingPerson"></el-checkbox>
              <el-checkbox label="叶先钱" name="processingPerson"></el-checkbox>
              <el-checkbox label="史伟" name="processingPerson"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="详情">
            <quill-editor
              v-model="mycontent"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            ></quill-editor>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisibleDeal = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit('Deal')" :loading="editDealLoading">提交</el-button>
        </div>
      </el-dialog>
      <!--处理详情界面-->
      <el-dialog title="详情" :visible.sync="detailFormVisibleDeal" :close-on-click-modal="false">
        <el-form
          :model="detailDealForm"
          label-width="80px"
          label-position="left"
          ref="detailDealForm"
        >
          <el-form-item label="名称" prop="name">
            <span>{{detailDealForm.name}}</span>
            <!-- <el-tag :type="tags[detailForm.priority]['type']">{{tags[detailForm.priority]['name']}}</el-tag> -->
          </el-form-item>
          <el-form-item label="类别" prop="type">
            <span>{{types[detailDealForm.type]}}</span>
          </el-form-item>
          <el-form-item label="状态" prop="schedule">
            <el-steps :space="100" :active="this.detailDealForm.schedule" finish-status="success">
              <el-step title="待审核" v-if="this.detailDealForm.schedule!=1"></el-step>
              <el-step title="已驳回" v-if="this.detailDealForm.schedule==1"></el-step>
              <!-- <el-step title="待审核"></el-step>
              <el-step :title="this.detailDealForm.schedule<=1?'已驳回':'已通过'"></el-step>-->
              <!-- <el-step title="已驳回" v-if="this.detailForm.schedule<=1"></el-step> -->
              <el-step title="处理中" v-if="this.detailDealForm.schedule!=1"></el-step>
              <el-step title="处理完成" v-if="this.detailDealForm.schedule!=1"></el-step>
              <!-- <el-step :title='this.detailDealForm.schedule<=2?"已驳回":"处理中"'></el-step> -->
              <!-- <el-step title="处理中"></el-step> -->
              <!-- <el-step title="处理中"></el-step> -->
              <!-- <el-step title="处理完成"></el-step> -->
            </el-steps>
          </el-form-item>
          <el-form-item label="优先级" prop="priority">
            <el-rate
              show-text
              disabled
              :texts="text"
              v-model="this.detailDealForm.priority"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :max="5"
              style="margin-top:8px;"
            />
          </el-form-item>
          <el-form-item label="创建人" prop="creator">
            <span>{{detailDealForm.creator}}</span>
          </el-form-item>
          <el-form-item label="详情" prop="detail">
            <!-- 从数据库读取展示 -->
            <div v-html="str" class="ql-editor">{{str}}</div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="detailFormVisibleDeal = false">关闭</el-button>
        </div>
      </el-dialog>
      <!--处理分页工具条-->
      <el-col :span="24" class="toolbar">
        <div class="pagination-container">
          <el-pagination
            v-show="this.dealTotal>0"
            :current-page="deal.page"
            :page-sizes="[10,20,30,50,this.dealTotal]"
            :page-size="deal.pageSize"
            :total="this.dealTotal"
            background
            layout="total, sizes, slot, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          >
            <el-button type="text" @click="showAll('Deal')">显示全部</el-button>
          </el-pagination>
        </div>
      </el-col>
    </div>
    <div v-show="finishShow">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="deal">
          <el-form-item>
            <el-input size="small" v-model="deal.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" plain @click="searchRequirements">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--已完成-->
      <el-table
        :data="requirementsFinish"
        @sort-change="sortNumber"
        highlight-current-row
        :loading="dealLoading"
        :height="tableHeight"
        style="width: 100%;"
      >
        <el-table-column prop="id" label="id" v-if="false"></el-table-column>
        <el-table-column type="index" header-align="center" align="center" width="45"></el-table-column>
        <el-table-column
          prop="createdDate"
          header-align="center"
          align="center"
          label="创建时间"
          :formatter="formatter"
          width="140"
          sortable
        ></el-table-column>
        <el-table-column
          prop="priority"
          align="center"
          header-align="center"
          label="重要程度"
          width="142"
          sortable
        >
          <el-table-column
            prop="priority"
            :render-header="renderHeader3"
            align="center"
            width="142"
          >
            <template slot-scope="scope">
              <el-tooltip
                placement="top"
                :content="scope.row.priority==1?'仅建议':scope.row.priority==2?'不重要不紧急':scope.row.priority==3?'重要不紧急':scope.row.priority==4?'紧急不重要':'重要且紧急'"
              >
                <el-rate v-model="scope.row.priority" disabled></el-rate>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="创建人" prop="creator" header-align="center" sortable>
          <el-table-column prop="creator" :render-header="renderHeader3" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="名称" prop="priority" header-align="center" sortable="important">
          <el-table-column prop="name" :render-header="renderHeader3" align="center">
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.name }}</span>
              <el-tag :type="tags[scope.row.priority]['type']">{{ tags[scope.row.priority]['name']}}</el-tag>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="类别" prop="type" header-align="center" min-width="100" sortable>
          <el-table-column prop="type" :render-header="renderHeader3" align="center">
            <template slot-scope="scope">
              <span>{{types[scope.row.type]}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="详情" prop="detail" header-align="center" min-width="180" sortable>
          <el-table-column
            prop="detail"
            :formatter="detailFormatter"
            :render-header="renderHeader3"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          header-align="center"
          label="处理人"
          prop="processingPerson"
          min-width="80"
          sortable
        >
          <el-table-column prop="processingPerson" :render-header="renderHeader3" align="center"></el-table-column>
        </el-table-column>
        <!-- <el-table-column label="状态"
                         prop="status"
                         header-align="center"
                         min-width="100"
                         sortable>
          <el-table-column prop="status"
                           :render-header="renderHeader1"
                           align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover"
                          placement="top">
                <p>说明: {{ status[scope.row.status]['hints']}}</p>
                <div slot="reference"
                     class="name-wrapper">
                  <el-tag size="medium">{{ status[scope.row.status]['name']}}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table-column>-->
        <el-table-column
          prop="deadline"
          align="center"
          header-align="center"
          label="预计完成时间"
          sortable
        ></el-table-column>
        <el-table-column
          prop="createdDays"
          align="center"
          header-align="center"
          label="已创建时间(天)"
          sortable
        ></el-table-column>
        <el-table-column label="操作" header-align="center" width="148">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handlfinishlDeal(scope.$index, scope.row)"
            >详情</el-button>
            <el-button type="danger" size="small" @click="handleDelDeal(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <div class="pagination-container">
          <el-pagination
            v-show="this.finishTotal>0"
            :current-page="finish.page"
            :page-sizes="[10,20,30,50,this.finishTotal]"
            :page-size="finish.pageSize"
            :total="this.finishTotal"
            background
            layout="total, sizes, slot, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          >
            <el-button type="text" @click="showAll('finish')">显示全部</el-button>
          </el-pagination>
        </div>
      </el-col>
      <el-dialog title="详情" :visible.sync="finishFormVisibleDeal" :close-on-click-modal="false">
        <el-form
          :model="detailfinishForm"
          label-width="80px"
          label-position="left"
          ref="detailDealForm"
        >
          <el-form-item label="名称" prop="name">
            <span>{{detailfinishForm.name}}</span>
            <!-- <el-tag :type="tags[detailForm.priority]['type']">{{tags[detailForm.priority]['name']}}</el-tag> -->
          </el-form-item>
          <el-form-item label="类别" prop="type">
            <span>{{types[detailfinishForm.type]}}</span>
          </el-form-item>
          <el-form-item label="状态" prop="schedule">
            <el-steps :space="100" :active="this.detailfinishForm.schedule" finish-status="success">
              <el-step title="待审核" v-if="this.detailfinishForm.schedule!=1"></el-step>
              <el-step title="已驳回" v-if="this.detailfinishForm.schedule==1"></el-step>
              <!-- <el-step title="待审核"></el-step>
              <el-step :title="this.detailfinishForm.schedule<=1?'已驳回':'已通过'"></el-step>-->
              <!-- <el-step title="已驳回" v-if="this.detailForm.schedule<=1"></el-step> -->
              <el-step title="处理中" v-if="this.detailfinishForm.schedule!=1"></el-step>
              <el-step title="处理完成" v-if="this.detailfinishForm.schedule!=1"></el-step>
              <!-- <el-step :title='this.detailDealForm.schedule<=2?"已驳回":"处理中"'></el-step> -->
              <!-- <el-step title="处理中"></el-step> -->
              <!-- <el-step title="处理中"></el-step> -->
              <!-- <el-step title="处理完成"></el-step> -->
            </el-steps>
          </el-form-item>
          <el-form-item label="优先级" prop="priority">
            <el-rate
              show-text
              disabled
              :texts="text"
              v-model="this.detailfinishForm.priority"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :max="5"
              style="margin-top:8px;"
            />
          </el-form-item>
          <el-form-item label="创建人" prop="creator">
            <span>{{detailfinishForm.creator}}</span>
          </el-form-item>
          <el-form-item label="详情" prop="detail">
            <!-- 从数据库读取展示 -->
            <div v-html="str" class="ql-editor">{{str}}</div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="finishFormVisibleDeal = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </section>
</template>

<script>
import {
  getRequirementsIndex,
  getRequirementsExamine,
  getRequirementsDeal,
  createRequirements,
  editRequirements,
  deleteRequirements,
  getExamine,
  getRequirementsFinish
} from "../../api/api";
import { compareUp, compareDown } from "../../api/tools";
import { getMenu } from "../../api/login";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend } from "quill-image-extend-module";

Quill.register("modules/ImageExtend", ImageExtend);
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 214,
      userShow: true,
      auditShow: false,
      dealShow: false,
      finishShow: false,
      allMenu: [],
      sels: [],
      activeName: "新需求",
      detail: "",
      str: "",
      img: "",
      total: null,
      auditTotal: null,
      dealTotal: null,
      finishTotal: null,
      content: "",
      mycontent: "",
      editorOption: {
        modules: {
          ImageExtend: {},
          toolbar: {
            container: container
          }
        },
        placeholder: "请输入详情内容 ..."
      },
      text: [
        "仅建议",
        "不重要不紧急",
        "重要不紧急",
        "紧急不重要",
        "重要且紧急"
      ],
      condition: {
        detail: "",
        name: "",
        type: "",
        creator: "",
        priority: "",
        schedule: "",
        status: "",
        sortProperty: "",
        sortOrder: "",
        page: 1,
        pageSize: 10
      },
      examine: {
        detail: "",
        creator: "",
        name: "",
        type: "",
        priority: "",
        processingPerson: "",
        page: 1,
        pageSize: 10
      },
      deal: {
        detail: "",
        name: "",
        type: "",
        priority: "",
        status: "",
        creator: "",
        processingPerson: "",
        sortProperty: "",
        sortOrder: "",
        page: 1,
        pageSize: 10
      },
      finish: {
        detail: "",
        name: "",
        type: "",
        priority: "",
        status: "",
        creator: "",
        processingPerson: "",
        sortProperty: "",
        sortOrder: "",
        page: 1,
        pageSize: 10
      },
      auditSuccess: {
        type: "pass",
        ids: []
      },
      auditFailed: {
        type: "failed",
        ids: []
      },
      tags: {
        1: { name: "仅建议", type: "" },
        2: { name: "不重要不紧急", type: "success" },
        3: { name: "重要不紧急", type: "info" },
        4: { name: "紧急不重要", type: "warning" },
        5: { name: "重要且紧急", type: "danger" }
      },
      types: {
        0: "BUG",
        1: "新需求",
        2: "任务",
        3: "改进建议"
      },
      schedule: {
        1: { name: "待审核", hints: "问题被提交,等待审核" },
        2: { name: "已驳回", hints: "问题被驳回，不予处理" },
        3: { name: "处理中", hints: "问题在处理当中，尚未完成" },
        // 4: { name: '处理中', hints: '问题在处理当中，尚未完成' },
        4: { name: "处理完成", hints: "问题处理结果得到确认，处于关闭状态" }
      },
      status: {
        1: { name: "Open ", hints: "问题被提交,等待处理" },
        2: { name: "In Progress", hints: "问题被处理，尚未完成" },
        3: {
          name: "Resovled",
          hints: "问题曾解决，但结论尚未被认可需重新分配解决"
        },
        4: {
          name: "Reopened ",
          hints: "问题解决，等待确认结果，确认的结果是Reopend或Closed"
        },
        5: { name: "Closed ", hints: "问题处理结果得到确认，处于关闭状态" }
      },
      dialogVisible: false,
      requirements: [],
      requirementsAudit: [],
      requirementsDeal: [],
      requirementsFinish: [],
      detailForm: {},
      detailDealForm: {},
      detailAddForm: {},
      detailfinishForm: {},
      addFormVisible: false, // 新增界面是否显示
      editFormVisible: false, // 编辑界面是否显示
      editFormVisibleDeal: false,
      editFormVisibleAudit: false,
      detailFormVisible: false,
      detailFormVisibleDeal: false,
      listLoading: false,
      addFormVisibleDeal: false,
      finishFormVisibleDeal: false,
      auditLoading: false,
      dealLoading: false,
      addLoading: false,
      editLoading: false,
      editDealLoading: false,
      editAuditLoading: false,
      shId: null,
      // 新增界面数据
      addForm: {
        id: 0,
        name: "",
        img: [],
        detail: "",
        type: 0,
        status: 0,
        priority: 1,
        processingPerson: []
      },
      // 新增界面数据
      editForm: {},
      editDealForm: {},
      editAuditForm: {
        processingPerson: []
      }
    };
  },
  watch: {
    activeName: function(newVal, oldVal) {
      this.activeName = newVal;
      this.getRequire(this.activeName);
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    time(time) {
      let hour, minute, second;
      let date = new Date(time);
      if (date.getHours() >= 0 && date.getHours() <= 9) {
        hour = "0" + date.getHours();
      } else {
        hour = date.getHours();
      }
      if (date.getMinutes() >= 0 && date.getMinutes() <= 9) {
        minute = "0" + date.getMinutes();
      } else {
        minute = date.getMinutes();
      }
      if (date.getSeconds() >= 0 && date.getSeconds() <= 9) {
        second = "0" + date.getSeconds();
      } else {
        second = date.getSeconds();
      }
      const date_value =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      this.editAuditForm.deadline = date_value;
    },
    // 排序
    sortNumber(column, prop, order) {
      // debugger
      if (column.order === "descending") {
        if (this.activeName === "新需求") {
          this.condition.sortOrder = "DESC";
          this.condition.sortProperty = column.prop;
        } else if (this.activeName === "待审核") {
          // this.deal.sortOrder = "DESC";
          // this.deal.sortProperty = column.prop;
        } else if (this.activeName === "处理中") {
          this.deal.sortOrder = "DESC";
          this.deal.sortProperty = column.prop;
        } else {
          this.finish.sortOrder = "DESC";
          this.finish.sortProperty = column.prop;
        }
        this.getRequire(this.activeName);
      } else {
        if (this.activeName === "新需求") {
          this.condition.sortOrder = "ASC";
          this.condition.sortProperty = column.prop;
        } else if (this.activeName === "待审核") {
          // this.deal.sortOrder = "ASC";
          // this.deal.sortProperty = column.prop;
        } else if (this.activeName === "处理中") {
          this.deal.sortOrder = "ASC";
          this.deal.sortProperty = column.prop;
        } else {
          this.finish.sortOrder = "ASC";
          this.finish.sortProperty = column.prop;
        }
        this.getRequire(this.activeName);
      }
    },
    // 批量审核
    selsChange(sels) {
      this.sels = sels;
    },
    auditSuccessAll() {
      this.auditSuccess.ids = this.sels.map(item => item.id);
      const condition = {};
      condition["condition"] = this.auditSuccess;
      if (this.auditSuccess.ids.length === 0) {
        this.$alert("请选择通过内容", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else {
        getExamine(condition).then(response => {
          this.$message({
            message: "审核通过",
            type: "success"
          });
          this.getRequire(this.activeName);
        });
      }
    },
    auditFailedAll() {
      this.auditFailed.ids = this.sels.map(item => item.id);
      const condition = {};
      condition["condition"] = this.auditFailed;
      if (this.auditFailed.ids.length === 0) {
        this.$alert("请选择驳回内容", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else {
        getExamine(condition).then(response => {
          this.$message.error("审核不通过");
          this.getRequire(this.activeName);
        });
      }
    },
    // 权限
    handleClick(tab, event) {
      if (tab.label === "新需求") {
        this.userShow = true;
      } else {
        this.userShow = false;
      }
      if (tab.label === "待审核") {
        this.auditShow = true;
      } else {
        this.auditShow = false;
      }
      if (tab.label === "处理中") {
        this.dealShow = true;
      } else {
        this.dealShow = false;
      }
      if (tab.label === "已完成") {
        this.finishShow = true;
      } else {
        this.finishShow = false;
      }
    },
    // 富文本
    onEditorBlur(quill) {
      // 失去焦点事件
    },
    onEditorFocus(quill) {
      // 获得焦点事件
    },
    onEditorReady(quill) {
      // 准备编辑器
    },
    onEditorChange({ quill, html, text }) {
      // 内容改变事件
      this.content = html;
      this.mycontent = html;
    },
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    },
    // 分页器
    handleCurrentChange(val) {
      if (this.activeName === "新需求") {
        this.condition.page = val;
      } else if (this.activeName === "待审核") {
        this.examine.page = val;
      } else if (this.activeName === "处理中") {
        this.deal.page = val;
      } else if (this.activeName === "已完成") {
        this.finish.page = val;
      }
      this.getRequire(this.activeName);
    },
    handleSizeChange(val) {
      if (this.activeName === "新需求") {
        this.condition.pageSize = val;
      } else if (this.activeName === "待审核") {
        this.examine.pageSize = val;
      } else if (this.activeName === "处理中") {
        this.deal.pageSize = val;
      } else if (this.activeName === "已完成") {
        this.finish.pageSize = val;
      }
      this.getRequire(this.activeName);
    },
    showAll(name) {
      if (name === "Audit") {
        this.handleSizeChange(this.auditTotal);
      } else if (name === "Deal") {
        this.handleSizeChange(this.dealTotal);
      } else if (name === "finish") {
        this.handleSizeChange(this.finishTotal);
      } else {
        this.handleSizeChange(this.total);
      }
    },
    formatter(row, column) {
      return row.createdDate ? row.createdDate.substring(0, 16) : "";
    },
    detailFormatter(row, column) {
      return row.detail.replace(/<\/?[^>]*>/g, "")
        ? row.detail.replace(/<\/?[^>]*>/g, "").substring(0, 100)
        : "";
    },
    searchRequirements() {
      this.getRequire(this.activeName);
    },
    // 新增
    addSubmit() {
      this.addFormVisible = false;
      this.addForm.img = this.content.match(/data:([^"]*)/g);
      // this.addForm.detail = this.content.replace(/<\/?[^>]*>/g,'').toString()
      const addContent = Object.assign({}, this.addForm);
      addContent.creator = this.$store.getters.name;
      addContent.processingPerson = this.addForm.processingPerson
        .filter(ele => ele.length > 0)
        .join(",");
      addContent.detail = this.content.replace(/data:([^"]*)/g, "");
      this.addForm.processingPerson = [];
      createRequirements(addContent).then(response => {
        this.requirements.unshift(response.data.data);
        this.getRequire(this.activeName);
      });
    },
    // 编辑界面提交
    editSubmit(name) {
      if (name === "Deal") {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.editDealLoading = true;
          this.editDealForm.processingPerson = this.editDealForm.processingPerson
            .filter(ele => ele.length > 0)
            .join(",");
          this.editDealForm.img =
            this.mycontent.match(/data:([^"]*)/g) ||
            this.mycontent.match(/http:([^"]*)/g);
          this.editDealForm.detail = this.mycontent.replace(
            /data:([^"]*)/g,
            ""
          );
          editRequirements(this.editDealForm).then(response => {
            this.editFormVisibleDeal = false;
            const req = response.data.data;
            this.editDealLoading = false;
            this.requirements = this.requirements.map(ele => {
              if (parseInt(ele.id) === req.id) {
                return req;
              }
              return ele;
            });
            this.getRequire(this.activeName);
          });
        });
      } else if (name === "Audit") {
        if (this.editAuditForm.processingPerson.length == 0) {
          this.$message.error("请选择处理人");
        } else if (!this.editAuditForm.deadline) {
          this.$message.error("请选择预估完成时间");
        } else {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editAuditLoading = true;
            this.editAuditForm.processingPerson = this.editAuditForm.processingPerson
              .filter(ele => ele.length > 0)
              .join(",");
            this.editAuditForm.img =
              this.mycontent.match(/data:([^"]*)/g) ||
              this.mycontent.match(/http:([^"]*)/g);
            this.editAuditForm.detail = this.mycontent.replace(
              /data:([^"]*)/g,
              ""
            );
            editRequirements(this.editAuditForm).then(response => {
              this.editFormVisibleAudit = false;
              const req = response.data.data;
              this.editAuditLoading = false;
              this.requirements = this.requirements.map(ele => {
                if (parseInt(ele.id) === req.id) {
                  return req;
                }
                return ele;
              });
              this.getRequire(this.activeName);
            });
          });
        }
      } else {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.editLoading = true;
          this.editForm.processingPerson = this.editForm.processingPerson
            .filter(ele => ele.length > 0)
            .join(",");
          this.editForm.img =
            this.mycontent.match(/data:([^"]*)/g) ||
            this.mycontent.match(/http:([^"]*)/g);
          this.editForm.detail = this.mycontent.replace(/data:([^"]*)/g, "");
          editRequirements(this.editForm).then(response => {
            this.editFormVisible = false;
            const req = response.data.data;
            this.editLoading = false;
            this.requirements = this.requirements.map(ele => {
              if (parseInt(ele.id) === req.id) {
                return req;
              }
              return ele;
            });
          });
        });
      }
    },
    // 新增
    handleAdd() {
      const form = {
        id: 0,
        name: "",
        img: [],
        detail: "",
        type: 0,
        status: 0,
        priority: 1,
        processingPerson: []
      };
      this.addForm = Object.assign({}, form);
      this.content='';
      this.addFormVisible = true;
    },
    // 详情
    handleDetail(index, row) {
      this.detailFormVisible = true;
      row.schedule = parseInt(row.schedule);
      row.priority = parseInt(row.priority);
      this.detailForm = Object.assign({}, row);
      if (this.detailForm.schedule != 4) {
        this.detailForm.schedule = Number(this.detailForm.schedule) - 1;
      }
      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i].id === row.id) {
          this.detailForm.detail = this.requirements[i].detail.replace(
            /""/g,
            this.requirements[i].img
          );
        }
      }
      this.str = this.escapeStringHTML(this.detailForm.detail);
    },
    handlAddlDeal(index, row) {
      this.addFormVisibleDeal = true;
      row.schedule = parseInt(row.schedule);
      row.priority = parseInt(row.priority);
      this.detailAddForm = Object.assign({}, row);
      if (this.detailAddForm.schedule != 4) {
        this.detailAddForm.schedule = Number(this.detailAddForm.schedule) - 1;
      }
      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i].id === row.id) {
          this.detailAddForm.detail = this.requirements[i].detail.replace(
            /""/g,
            this.requirements[i].img
          );
        }
      }
      this.str = this.escapeStringHTML(this.detailAddForm.detail);
    },
    handlfinishlDeal(index, row) {
      this.finishFormVisibleDeal = true;
      row.schedule = parseInt(row.schedule);
      row.priority = parseInt(row.priority);
      this.detailfinishForm = Object.assign({}, row);
      if (this.detailfinishForm.schedule != 4) {
        this.detailfinishForm.schedule =
          Number(this.detailfinishForm.schedule) - 1;
      }
      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i].id === row.id) {
          this.detailAddForm.detail = this.requirements[i].detail.replace(
            /""/g,
            this.requirements[i].img
          );
        }
      }
      this.str = this.escapeStringHTML(this.detailfinishForm.detail);
    },
    handleDetailDeal(index, row) {
      this.detailFormVisibleDeal = true;
      row.schedule = parseInt(row.schedule);
      row.priority = parseInt(row.priority);
      this.detailDealForm = Object.assign({}, row);
      if (this.detailDealForm.schedule != 4) {
        this.detailDealForm.schedule = Number(this.detailDealForm.schedule) - 1;
      }
      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i].id === row.id) {
          this.detailDealForm.detail = this.requirements[i].detail.replace(
            /""/g,
            this.requirements[i].img
          );
        }
      }
      this.str = this.escapeStringHTML(this.detailDealForm.detail);
    },
    // 编辑界面弹出
    handleEdit(index, row) {
      this.editFormVisible = true;
      row.priority = parseInt(row.priority);
      this.editForm = Object.assign({}, row);
      this.editForm.processingPerson = this.editForm.processingPerson.split(
        ","
      );
      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i].id === row.id) {
          this.editForm.detail = this.requirements[i].detail.replace(
            /""/g,
            this.requirements[i].img
          );
        }
      }
      this.mycontent = this.editForm.detail;
    },
    handleEditAudit(index, row) {
      this.editFormVisibleAudit = true;
      this.shId = row.id;
      row.priority = parseInt(row.priority);
      this.editAuditForm = Object.assign({}, row);
      this.editAuditForm.processingPerson = this.editAuditForm.processingPerson.split(
        ","
      );
      if (this.editAuditForm.processingPerson[0] == "") {
        this.editAuditForm.processingPerson.shift();
      }
      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i].id === row.id) {
          this.editAuditForm.detail = this.requirements[i].detail.replace(
            /""/g,
            this.requirements[i].img
          );
        }
      }
      this.mycontent = this.editAuditForm.detail;
    },
    handleEditDeal(index, row) {
      this.editFormVisibleDeal = true;
      row.priority = parseInt(row.priority);
      this.editDealForm = Object.assign({}, row);
      this.editDealForm.processingPerson = this.editDealForm.processingPerson.split(
        ","
      );
      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i].id === row.id) {
          this.editDealForm.detail = this.requirements[i].detail.replace(
            /""/g,
            this.requirements[i].img
          );
        }
      }
      this.mycontent = this.editDealForm.detail;
    },
    // 删除
    handleDel(index, row) {
      this.$confirm("确定删除该条记录？", "提示", { type: "warning" }).then(
        () => {
          this.listLoading = true;
          deleteRequirements(row.id).then(res => {
            this.listLoading = false;
            this.requirements.splice(index, 1);
          });
        }
      );
    },
    handleDelDeal(index, row) {
      this.$confirm("确定删除该条记录？", "提示", { type: "warning" }).then(
        () => {
          this.dealLoading = true;
          deleteRequirements(row.id).then(res => {
            this.dealLoading = false;
            this.requirements.splice(index, 1);
            this.getRequire(this.activeName);
          });
        }
      );
    },
    // 审核
    handleSuccess(index, row) {
      if (this.editAuditForm.processingPerson.length == 0) {
        this.$message.error("请选择处理人");
      } else if (!this.editAuditForm.deadline) {
        this.$message.error("请选择预估完成时间");
      } else {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.editAuditLoading = true;
          this.editAuditForm.processingPerson = this.editAuditForm.processingPerson
            .filter(ele => ele.length > 0)
            .join(",");
          this.editAuditForm.img =
            this.mycontent.match(/data:([^"]*)/g) ||
            this.mycontent.match(/http:([^"]*)/g);
          this.editAuditForm.detail = this.mycontent.replace(
            /data:([^"]*)/g,
            ""
          );
          editRequirements(this.editAuditForm).then(response => {
            const req = response.data.data;
            this.editAuditLoading = false;
            this.requirements = this.requirements.map(ele => {
              if (parseInt(ele.id) === req.id) {
                return req;
              }
              return ele;
            });
            this.auditSuccess.ids = [this.shId];
            const condition = {};
            condition["condition"] = this.auditSuccess;
            getExamine(condition).then(response => {
              if (response.data.code == 200) {
                this.editFormVisibleAudit = false;
                // this.auditLoading = false;
                this.$message({
                  message: "审核通过",
                  type: "success"
                });
                this.editFormVisibleAudit = false;
                this.getRequire(this.activeName);
              } else {
                this.$message.error(response.data.message);
              }
            });
          });
        });
      }
      // this.auditLoading = true;
    },
    handleReject(index, row) {
      // this.dealLoading = true;
      this.auditFailed.ids = [this.shId];
      const condition = {};
      condition["condition"] = this.auditFailed;
      getExamine(condition).then(response => {
        if (response.data.code == 200) {
          this.editFormVisibleAudit = false;
          // this.dealLoading = false;
          this.$message.error("审核不通过");
          this.getRequire(this.activeName);
        } else {
          this.$message.error(response.data.message);
        }
      });
    },
    getRequire(name) {
      if (name === "新需求") {
        getRequirementsIndex(this.condition).then(response => {
          const res = response.data.data;
          for (let i = 0; i < res.items.length; i++) {
            res.items[i].priority = Number(res.items[i].priority);
          }
          this.requirements = res.items;
          this.total = res._meta.totalCount;
          this.condition.page = res._meta.currentPage;
          this.condition.pageSize = res._meta.perPage;
        });
      } else if (name === "待审核") {
        getRequirementsExamine(this.examine).then(response => {
          const res = response.data.data;
          for (let i = 0; i < res.items.length; i++) {
            res.items[i].priority = Number(res.items[i].priority);
          }
          this.requirementsAudit = res.items;
          this.auditTotal = res._meta.totalCount;
          this.examine.page = res._meta.currentPage;
          this.examine.pageSize = res._meta.perPage;
        });
      } else if (name === "处理中") {
        getRequirementsDeal(this.deal).then(response => {
          const res = response.data.data;
          for (let i = 0; i < res.items.length; i++) {
            res.items[i].priority = Number(res.items[i].priority);
          }
          this.requirementsDeal = res.items;
          this.dealTotal = res._meta.totalCount;
          this.deal.page = res._meta.currentPage;
          this.deal.pageSize = res._meta.perPage;
        });
      } else if (name === "已完成") {
        getRequirementsFinish(this.finish).then(response => {
          const res = response.data.data;
          for (let i = 0; i < res.items.length; i++) {
            res.items[i].priority = Number(res.items[i].priority);
          }
          this.requirementsFinish = res.items;
          this.finishTotal = res._meta.totalCount;
          this.finish.page = res._meta.currentPage;
          this.finish.pageSize = res._meta.perPage;
        });
      }
    },
    renderHeader(h, { column, $index }) {
      if ($index === 0) {
        const filters = [
          { text: 1, value: "仅建议" },
          { text: 2, value: "不重要不紧急" },
          { text: 3, value: "重要不紧急" },
          { text: 4, value: "紧急不重要" },
          { text: 5, value: "重要且紧急" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.priority,
              size: "mini",
              clearable: true
            },
            style: {
              width: "130"
            },
            on: {
              input: value => {
                this.condition.priority = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getRequire(this.activeName);
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 1) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.condition.creator,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.creator = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getRequire(this.activeName);
                }
              }
            })
          ]
        );
      } else if ($index === 2) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.condition.name,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.name = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getRequire(this.activeName);
                }
              }
            })
          ]
        );
      } else if ($index === 3) {
        const filters = [
          { text: 0, value: "BUG" },
          { text: 1, value: "新需求" },
          { text: 2, value: "任务" },
          { text: 3, value: "改进建议" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.type,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.type = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getRequire(this.activeName);
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 4) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.condition.detail,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.condition.detail = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getRequire(this.activeName);
                }
              }
            })
          ]
        );
      } else if ($index === 5) {
        const filters = [
          { text: 1, value: "待审核" },
          { text: 2, value: "已驳回" },
          { text: 3, value: "处理中" },
          { text: 4, value: "处理完成" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.condition.schedule,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.condition.schedule = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getRequire(this.activeName);
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      }
    },
    renderHeader1(h, { column, $index }) {
      if ($index === 0) {
        const filters = [
          { text: 1, value: "仅建议" },
          { text: 2, value: "不重要不紧急" },
          { text: 3, value: "重要不紧急" },
          { text: 4, value: "紧急不重要" },
          { text: 5, value: "重要且紧急" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.deal.priority,
              size: "mini",
              clearable: true
            },
            style: {
              width: "130"
            },
            on: {
              input: value => {
                this.deal.priority = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getRequire(this.activeName);
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 1) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.deal.creator,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.deal.creator = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getRequire(this.activeName);
                }
              }
            })
          ]
        );
      } else if ($index === 2) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.deal.name,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.deal.name = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getRequire(this.activeName);
                }
              }
            })
          ]
        );
      } else if ($index === 3) {
        const filters = [
          { text: 0, value: "BUG" },
          { text: 1, value: "新需求" },
          { text: 2, value: "任务" },
          { text: 3, value: "改进建议" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.deal.type,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.deal.type = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getRequire(this.activeName);
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 4) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.deal.detail,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.deal.detail = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getRequire(this.activeName);
                }
              }
            })
          ]
        );
      } else if ($index === 5) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.deal.processingPerson,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.deal.processingPerson = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getRequire(this.activeName);
                }
              }
            })
          ]
        );
      } else if ($index === 6) {
        const filters = [
          { text: 1, value: "Open" },
          { text: 2, value: "In Progress" },
          { text: 3, value: "Resovled" },
          { text: 4, value: "Reopened" },
          { text: 5, value: "Closed" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.deal.status,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.deal.status = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getRequire(this.activeName);
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      }
    },
    renderHeader3(h, { column, $index }) {
      if ($index === 0) {
        const filters = [
          { text: 1, value: "仅建议" },
          { text: 2, value: "不重要不紧急" },
          { text: 3, value: "重要不紧急" },
          { text: 4, value: "紧急不重要" },
          { text: 5, value: "重要且紧急" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.finish.priority,
              size: "mini",
              clearable: true
            },
            style: {
              width: "130"
            },
            on: {
              input: value => {
                this.finish.priority = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getRequire(this.activeName);
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 1) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.finish.creator,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.finish.creator = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getRequire(this.activeName);
                }
              }
            })
          ]
        );
      } else if ($index === 2) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.finish.name,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.finish.name = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getRequire(this.activeName);
                }
              }
            })
          ]
        );
      } else if ($index === 3) {
        const filters = [
          { text: 0, value: "BUG" },
          { text: 1, value: "新需求" },
          { text: 2, value: "任务" },
          { text: 3, value: "改进建议" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.finish.type,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.finish.type = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getRequire(this.activeName);
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 4) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.finish.detail,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.finish.detail = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getRequire(this.activeName);
                }
              }
            })
          ]
        );
      } else if ($index === 5) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.finish.processingPerson,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.finish.processingPerson = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getRequire(this.activeName);
                }
              }
            })
          ]
        );
      }
    },
    renderHeader2(h, { column, $index }) {
      if ($index === 0) {
        const filters = [
          { text: 1, value: "仅建议" },
          { text: 2, value: "不重要不紧急" },
          { text: 3, value: "重要不紧急" },
          { text: 4, value: "紧急不重要" },
          { text: 5, value: "重要且紧急" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.examine.priority,
              size: "mini",
              clearable: true
            },
            style: {
              width: "130"
            },
            on: {
              input: value => {
                this.examine.priority = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getRequire(this.activeName);
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 1) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.examine.creator,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.examine.creator = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getRequire(this.activeName);
                }
              }
            })
          ]
        );
      } else if ($index === 2) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.examine.name,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.examine.name = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getRequire(this.activeName);
                }
              }
            })
          ]
        );
      } else if ($index === 3) {
        const filters = [
          { text: 0, value: "BUG" },
          { text: 1, value: "新需求" },
          { text: 2, value: "任务" },
          { text: 3, value: "改进建议" }
        ];
        return h(
          "el-select",
          {
            props: {
              placeholder: "请选择",
              value: this.examine.type,
              size: "mini",
              clearable: true
            },
            on: {
              input: value => {
                this.examine.type = value;
                this.$emit("input", value);
              },
              change: searchValue => {
                this.getRequire(this.activeName);
              }
            }
          },
          [
            filters.map(item => {
              return h("el-option", {
                props: {
                  value: item.text,
                  label: item.value
                }
              });
            })
          ]
        );
      } else if ($index === 4) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.examine.detail,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.examine.detail = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getRequire(this.activeName);
                }
              }
            })
          ]
        );
      } else if ($index === 5) {
        return h(
          "div",
          {
            style: {
              height: "40px"
            }
          },
          [
            h("el-input", {
              props: {
                value: this.examine.processingPerson,
                size: "mini",
                clearable: true
              },
              on: {
                input: value => {
                  this.examine.processingPerson = value;
                  this.$emit("input", value);
                },
                change: value => {
                  this.getRequire(this.activeName);
                }
              }
            })
          ]
        );
      }
    }
  },
  mounted() {
    getMenu().then(response => {
      const res = response.data.data;
      const menu = res.filter(e => e.name === "反馈中心");
      for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < menu[i].children.length; j++) {
          if (menu[i].children[j].tabs.length) {
            this.allMenu = menu[i].children[j].tabs;
          }
        }
      }
    });
    this.getRequire(this.activeName);
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  padding: 10px 0;
}
</style>
